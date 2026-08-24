"""
CRUD Layer - all direct DB reads/writes live here so routers stay thin.
This is also where we call into ai_engine.py to recompute priority and
power allocation whenever the system state changes (new booking, EV
finishes charging, etc).
"""
from datetime import datetime, timedelta
from typing import List, Optional

from sqlalchemy.orm import Session as DBSession

from . import models, ai_engine
from .config import LOW_BATTERY_ALERT_THRESHOLD, OFF_PEAK_START_HOUR, OFF_PEAK_END_HOUR


# ---------- Station ----------

def get_station(db: DBSession, station_id: str) -> Optional[models.Station]:
    return db.query(models.Station).filter(models.Station.station_id == station_id).first()


def list_stations(db: DBSession) -> List[models.Station]:
    return db.query(models.Station).all()


# ---------- Chargers ----------

def list_chargers(db: DBSession, station_id: str) -> List[models.Charger]:
    return db.query(models.Charger).filter(models.Charger.station_id == station_id).all()


def get_available_charger(db: DBSession, station_id: str) -> Optional[models.Charger]:
    return (
        db.query(models.Charger)
        .filter(
            models.Charger.station_id == station_id,
            models.Charger.status == models.ChargerStatus.AVAILABLE,
        )
        .first()
    )


# ---------- EV Sessions (booking + lifecycle) ----------

def create_booking(db: DBSession, station_id: str, ev_id: str, user_id: str,
                    battery_percentage: float, target_percentage: float,
                    departure_minutes_from_now: int) -> models.EVSession:
    session = models.EVSession(
        ev_id=ev_id,
        user_id=user_id,
        station_id=station_id,
        battery_percentage=battery_percentage,
        target_percentage=target_percentage,
        departure_time=datetime.utcnow() + timedelta(minutes=departure_minutes_from_now),
        charging_status=models.SessionStatus.QUEUED,
    )
    db.add(session)
    db.commit()
    db.refresh(session)

    # try to assign a charger immediately if one is free
    charger = get_available_charger(db, station_id)
    if charger:
        assign_charger(db, session, charger)

    recompute_station(db, station_id)
    return session


def assign_charger(db: DBSession, session: models.EVSession, charger: models.Charger):
    charger.status = models.ChargerStatus.OCCUPIED_CHARGING
    charger.occupied_by = session.session_id
    session.charger_id = charger.charger_id
    session.charging_status = models.SessionStatus.CHARGING
    db.commit()


def get_session(db: DBSession, session_id: str) -> Optional[models.EVSession]:
    return db.query(models.EVSession).filter(models.EVSession.session_id == session_id).first()


def list_sessions_for_station(db: DBSession, station_id: str) -> List[models.EVSession]:
    return db.query(models.EVSession).filter(models.EVSession.station_id == station_id).all()


def list_active_sessions(db: DBSession, station_id: str) -> List[models.EVSession]:
    return (
        db.query(models.EVSession)
        .filter(
            models.EVSession.station_id == station_id,
            models.EVSession.charging_status.in_(
                [models.SessionStatus.CHARGING, models.SessionStatus.ASSIGNED]
            ),
        )
        .all()
    )


def list_queued_sessions(db: DBSession, station_id: str) -> List[models.EVSession]:
    return (
        db.query(models.EVSession)
        .filter(
            models.EVSession.station_id == station_id,
            models.EVSession.charging_status == models.SessionStatus.QUEUED,
        )
        .order_by(models.EVSession.priority_score.desc())
        .all()
    )


def cancel_session(db: DBSession, session: models.EVSession):
    session.charging_status = models.SessionStatus.CANCELLED
    if session.charger_id:
        charger = db.query(models.Charger).filter(models.Charger.charger_id == session.charger_id).first()
        if charger:
            charger.status = models.ChargerStatus.AVAILABLE
            charger.occupied_by = None
            charger.current_power_kw = 0.0
    session.allocated_power_kw = 0.0
    db.commit()
    recompute_station(db, session.station_id)


def complete_session(db: DBSession, session: models.EVSession):
    """Called when battery reaches target or departure time hits - frees the charger."""
    session.charging_status = models.SessionStatus.COMPLETED
    session.allocated_power_kw = 0.0
    if session.charger_id:
        charger = db.query(models.Charger).filter(models.Charger.charger_id == session.charger_id).first()
        if charger:
            charger.status = models.ChargerStatus.AVAILABLE
            charger.occupied_by = None
            charger.current_power_kw = 0.0
    db.commit()

    # promote the next queued EV into the now-free charger
    next_in_queue = list_queued_sessions(db, session.station_id)
    if next_in_queue and session.charger_id:
        charger = db.query(models.Charger).filter(models.Charger.charger_id == session.charger_id).first()
        if charger:
            assign_charger(db, next_in_queue[0], charger)

    recompute_station(db, session.station_id)


# ---------- Recompute (the "AI runs here" step) ----------

def recompute_station(db: DBSession, station_id: str):
    """
    Core recalculation loop, called after any state change:
      1. recompute priority_score for every non-terminal session
      2. re-run dynamic power allocation across the station's grid limit
      3. update estimated wait time for queued sessions
      4. update station.current_power_usage_kw
    """
    station = get_station(db, station_id)
    if not station:
        return

    sessions = [
        s for s in list_sessions_for_station(db, station_id)
        if s.charging_status in (
            models.SessionStatus.QUEUED,
            models.SessionStatus.ASSIGNED,
            models.SessionStatus.CHARGING,
        )
    ]

    for s in sessions:
        s.priority_score = ai_engine.calculate_priority(s)

    allocation = ai_engine.allocate_power(sessions, station.total_power_limit_kw)

    total_usage = 0.0
    for s in sessions:
        kw = allocation.get(s.session_id, 0.0)
        if s.charging_status == models.SessionStatus.CHARGING:
            s.allocated_power_kw = kw
            total_usage += kw
            if s.charger_id:
                charger = db.query(models.Charger).filter(
                    models.Charger.charger_id == s.charger_id
                ).first()
                if charger:
                    charger.current_power_kw = kw
        else:
            s.allocated_power_kw = 0.0

    queued = list_queued_sessions(db, station_id)
    for idx, s in enumerate(queued, start=1):
        s.estimated_wait_time_min = ai_engine.estimate_wait_time_minutes(s, idx)

    station.current_power_usage_kw = round(total_usage, 2)
    db.commit()


# ---------- Alerts (Smart Charging Alerts - lightweight MVP feature) ----------

def get_alerts(db: DBSession, station_id: str) -> List[str]:
    alerts = []
    sessions = list_active_sessions(db, station_id) + list_queued_sessions(db, station_id)

    for s in sessions:
        if s.battery_percentage <= LOW_BATTERY_ALERT_THRESHOLD:
            alerts.append(f"⚠️ EV {s.ev_id} battery critically low ({s.battery_percentage}%)")

        minutes_left = (s.departure_time - datetime.utcnow()).total_seconds() / 60
        if s.charging_status == models.SessionStatus.QUEUED and minutes_left < s.estimated_wait_time_min:
            alerts.append(f"⏱️ EV {s.ev_id} may not reach target before departure")

    hour = datetime.utcnow().hour
    is_off_peak = hour >= OFF_PEAK_START_HOUR or hour < OFF_PEAK_END_HOUR
    if is_off_peak:
        alerts.append("💡 Off-peak hours - cheaper charging available now")

    return alerts
