"""
GridFlow AI - Backend Entry Point
-----------------------------------
Run with:  uvicorn app.main:app --reload
Docs at:   http://127.0.0.1:8000/docs
"""
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import models, crud
from .database import Base, engine, SessionLocal
from .config import DEFAULT_STATION_ID, DEFAULT_GRID_LIMIT_KW, DEFAULT_NUM_CHARGERS, DEFAULT_CHARGER_MAX_KW
from .routers import stations, chargers, sessions, queue
from .simulation import simulation_loop

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="GridFlow AI Backend",
    description="AI-based EV Charging Station Management System - REST API",
    version="1.0.0",
)

# Allow the React frontend (any localhost port) to call this API during the hackathon
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # tighten this before any real deployment
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stations.router)
app.include_router(chargers.router)
app.include_router(sessions.router)
app.include_router(queue.router)


def seed_demo_data():
    """Creates one demo station with 4 chargers, matching the spec's demo scenario."""
    db = SessionLocal()
    try:
        existing = crud.get_station(db, DEFAULT_STATION_ID)
        if existing:
            return
        station = models.Station(
            station_id=DEFAULT_STATION_ID,
            name="GridFlow Demo Station",
            total_power_limit_kw=DEFAULT_GRID_LIMIT_KW,
            total_chargers=DEFAULT_NUM_CHARGERS,
        )
        db.add(station)
        db.commit()

        for _ in range(DEFAULT_NUM_CHARGERS):
            charger = models.Charger(
                station_id=DEFAULT_STATION_ID,
                max_power_kw=DEFAULT_CHARGER_MAX_KW,
            )
            db.add(charger)
        db.commit()
    finally:
        db.close()


@app.on_event("startup")
async def on_startup():
    seed_demo_data()
    asyncio.create_task(simulation_loop())


@app.get("/")
def root():
    return {"message": "GridFlow AI backend is running", "docs": "/docs"}
