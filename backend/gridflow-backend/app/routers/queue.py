from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session as DBSession

from .. import crud, schemas
from ..database import get_db

router = APIRouter(prefix="/queue", tags=["Smart Queue"])


@router.get("/{station_id}", response_model=list[schemas.QueueEntryOut])
def get_queue(station_id: str, db: DBSession = Depends(get_db)):
    """
    Feature 3 - Smart Queue Management.
    Returns EVs waiting, ranked by priority (not first-come-first-served),
    with queue position + estimated wait time already computed.
    """
    queued = crud.list_queued_sessions(db, station_id)
    return [
        schemas.QueueEntryOut(
            session_id=s.session_id,
            ev_id=s.ev_id,
            queue_position=idx,
            estimated_wait_time_min=s.estimated_wait_time_min,
            priority_score=s.priority_score,
            charging_status=s.charging_status,
        )
        for idx, s in enumerate(queued, start=1)
    ]
