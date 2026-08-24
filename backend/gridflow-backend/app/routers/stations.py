from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session as DBSession

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/stations", tags=["Stations"])


@router.get("/", response_model=list[schemas.StationOut])
def list_stations(db: DBSession = Depends(get_db)):
    return crud.list_stations(db)


@router.get("/{station_id}", response_model=schemas.StationOut)
def get_station(station_id: str, db: DBSession = Depends(get_db)):
    station = crud.get_station(db, station_id)
    if not station:
        raise HTTPException(404, "Station not found")
    return station


@router.get("/{station_id}/dashboard", response_model=schemas.AdminDashboardOut)
def admin_dashboard(station_id: str, db: DBSession = Depends(get_db)):
    """
    Single endpoint the Admin Dashboard screen calls to render everything:
    station stats, all chargers, active sessions, queue, and live alerts.
    """
    station = crud.get_station(db, station_id)
    if not station:
        raise HTTPException(404, "Station not found")

    return schemas.AdminDashboardOut(
        station=station,
        chargers=crud.list_chargers(db, station_id),
        active_sessions=crud.list_active_sessions(db, station_id),
        queued_sessions=crud.list_queued_sessions(db, station_id),
        alerts=crud.get_alerts(db, station_id),
    )
