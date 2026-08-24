"""
ORM Models - mirrors the object contracts defined in the project spec
(Section 8: Important API Data), so DB, Backend, and AI stay in sync.
"""
import enum
import uuid
from datetime import datetime

from sqlalchemy import Column, String, Float, Integer, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


def gen_id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


class ChargerStatus(str, enum.Enum):
    AVAILABLE = "available"
    OCCUPIED_CHARGING = "occupied_charging"
    OCCUPIED_IDLE = "occupied_idle"   # vehicle parked but not drawing power (vision feature hook)


class SessionStatus(str, enum.Enum):
    QUEUED = "queued"
    ASSIGNED = "assigned"       # charger reserved, not yet charging
    CHARGING = "charging"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Station(Base):
    __tablename__ = "stations"

    station_id = Column(String, primary_key=True, default=lambda: gen_id("STATION"))
    name = Column(String, default="GridFlow Station")
    total_power_limit_kw = Column(Float, nullable=False)   # e.g. 100 kW grid cap
    current_power_usage_kw = Column(Float, default=0.0)
    total_chargers = Column(Integer, default=0)

    chargers = relationship("Charger", back_populates="station", cascade="all, delete-orphan")
    sessions = relationship("EVSession", back_populates="station", cascade="all, delete-orphan")


class Charger(Base):
    __tablename__ = "chargers"

    charger_id = Column(String, primary_key=True, default=lambda: gen_id("CHG"))
    station_id = Column(String, ForeignKey("stations.station_id"))
    status = Column(Enum(ChargerStatus), default=ChargerStatus.AVAILABLE)
    max_power_kw = Column(Float, default=50.0)
    current_power_kw = Column(Float, default=0.0)
    occupied_by = Column(String, ForeignKey("ev_sessions.session_id"), nullable=True)

    station = relationship("Station", back_populates="chargers", foreign_keys=[station_id])


class EVSession(Base):
    """
    Represents one EV's booking / charging lifecycle - the core object
    the AI engine reads from and writes priority/allocation back to.
    """
    __tablename__ = "ev_sessions"

    session_id = Column(String, primary_key=True, default=lambda: gen_id("SESS"))
    ev_id = Column(String, nullable=False)
    user_id = Column(String, nullable=False)
    station_id = Column(String, ForeignKey("stations.station_id"))
    charger_id = Column(String, nullable=True)

    battery_percentage = Column(Float, nullable=False)
    target_percentage = Column(Float, nullable=False)
    departure_time = Column(DateTime, nullable=False)   # when the EV plans to leave

    charging_status = Column(Enum(SessionStatus), default=SessionStatus.QUEUED)
    allocated_power_kw = Column(Float, default=0.0)
    priority_score = Column(Float, default=0.0)
    estimated_wait_time_min = Column(Float, default=0.0)

    booking_time = Column(DateTime, default=datetime.utcnow)

    station = relationship("Station", back_populates="sessions", foreign_keys=[station_id])
