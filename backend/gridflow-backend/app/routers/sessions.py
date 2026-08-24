from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession

from .. import crud, schemas, models
from ..database import get_db
from ..config import DEFAULT_STATION_ID

router = APIRouter(prefix="/sessions", tags=["EV Sessions / Booking"])


@router.post("/book", response_model=schemas.SessionOut)
def book_session(payload: schemas.BookingCreate, db: DBSession = Depends(get_db)):
    """
    Main USER BOOKING endpoint (Feature 1).
    Frontend calls this when a user fills the booking form.
    """
    station_id = payload.station_id or DEFAULT_STATION_ID
    station = crud.get_station(db, station_id)
    if not station:
        raise HTTPException(404, "Station not found")

    session = crud.create_booking(
        db,
        station_id=station_id,
        ev_id=payload.ev_id,
        user_id=payload.user_id,
        battery_percentage=payload.battery_percentage,
        target_percentage=payload.target_percentage,
        departure_minutes_from_now=payload.departure_minutes_from_now,
    )
    return session


@router.get("/{session_id}", response_model=schemas.SessionOut)
def get_session_status(session_id: str, db: DBSession = Depends(get_db)):
    """User polls this to see live battery %, allocated power, status."""
    session = crud.get_session(db, session_id)
    if not session:
        raise HTTPException(404, "Session not found")
    return session


@router.get("/user/{user_id}/active", response_model=list[schemas.SessionOut])
def get_user_sessions(user_id: str, db: DBSession = Depends(get_db)):
    sessions = (
        db.query(models.EVSession)
        .filter(models.EVSession.user_id == user_id)
        .order_by(models.EVSession.booking_time.desc())
        .all()
    )
    return sessions


@router.patch("/{session_id}/cancel", response_model=schemas.SessionOut)
def cancel_session(session_id: str, db: DBSession = Depends(get_db)):
    session = crud.get_session(db, session_id)
    if not session:
        raise HTTPException(404, "Session not found")
    crud.cancel_session(db, session)
    return session
