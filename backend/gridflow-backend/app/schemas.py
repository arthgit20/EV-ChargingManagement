"""
Pydantic Schemas - the exact JSON shape the Frontend team should expect
on every endpoint. Keep this file as the single source of truth when
writing frontend API calls.
"""
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field


# ---------- EV Session (Booking) ----------

class BookingCreate(BaseModel):
    ev_id: str
    user_id: str
    battery_percentage: float = Field(..., ge=0, le=100)
    target_percentage: float = Field(..., ge=0, le=100)
    departure_minutes_from_now: int = Field(..., gt=0, description="e.g. 30 = leaving in 30 min")
    station_id: Optional[str] = None  # defaults to the demo station if omitted


class SessionOut(BaseModel):
    session_id: str
    ev_id: str
    user_id: str
    station_id: str
    charger_id: Optional[str]
    battery_percentage: float
    target_percentage: float
    departure_time: datetime
    charging_status: str
    allocated_power_kw: float
    priority_score: float
    estimated_wait_time_min: float
    booking_time: datetime

    class Config:
        from_attributes = True


# ---------- Charger ----------

class ChargerOut(BaseModel):
    charger_id: str
    station_id: str
    status: str
    max_power_kw: float
    current_power_kw: float
    occupied_by: Optional[str]

    class Config:
        from_attributes = True


# ---------- Station ----------

class StationOut(BaseModel):
    station_id: str
    name: str
    total_power_limit_kw: float
    current_power_usage_kw: float
    total_chargers: int

    class Config:
        from_attributes = True


class AdminDashboardOut(BaseModel):
    station: StationOut
    chargers: List[ChargerOut]
    active_sessions: List[SessionOut]
    queued_sessions: List[SessionOut]
    alerts: List[str]


# ---------- Queue ----------

class QueueEntryOut(BaseModel):
    session_id: str
    ev_id: str
    queue_position: int
    estimated_wait_time_min: float
    priority_score: float
    charging_status: str
