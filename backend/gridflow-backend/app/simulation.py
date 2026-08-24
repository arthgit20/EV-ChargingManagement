"""
Simulated Charging Data Engine
--------------------------------
Since there's no real hardware, this background loop makes the system
"feel" real-time: every few seconds it increases battery % for every
charging EV based on its currently allocated power, and completes
sessions once they hit target or departure time.

Started automatically on FastAPI startup (see main.py).
"""
import asyncio
from datetime import datetime

from . import models, crud
from .database import SessionLocal
from .config import SIMULATION_TICK_SECONDS, SIMULATION_KWH_TO_PERCENT


async def simulation_loop():
    while True:
        await asyncio.sleep(SIMULATION_TICK_SECONDS)
        db = SessionLocal()
        try:
            _tick(db)
        finally:
            db.close()


def _tick(db):
    stations = crud.list_stations(db)
    for station in stations:
        active = crud.list_active_sessions(db, station.station_id)
        changed = False

        for s in active:
            if s.charging_status != models.SessionStatus.CHARGING:
                continue

            # battery increases proportional to allocated power
            increment = (s.allocated_power_kw / 10.0) * SIMULATION_KWH_TO_PERCENT
            s.battery_percentage = min(100.0, round(s.battery_percentage + increment, 1))
            changed = True

            reached_target = s.battery_percentage >= s.target_percentage
            departed = datetime.utcnow() >= s.departure_time

            if reached_target or departed:
                crud.complete_session(db, s)

        if changed:
            db.commit()
            crud.recompute_station(db, station.station_id)
