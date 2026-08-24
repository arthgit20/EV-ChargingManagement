from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session as DBSession

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/chargers", tags=["Chargers"])


@router.get("/{station_id}", response_model=list[schemas.ChargerOut])
def list_chargers(station_id: str, db: DBSession = Depends(get_db)):
    return crud.list_chargers(db, station_id)
