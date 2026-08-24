# GridFlow AI — Backend

FastAPI backend for the AI-Based EV Charging Station Management System.
Covers: booking, charging status, dynamic power allocation, smart queue,
admin dashboard, and simulated real-time charging data.

## 1. Setup (VS Code)

```bash
cd gridflow-backend
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open **http://127.0.0.1:8000/docs** — interactive Swagger UI, auto-generated
from the code. Your frontend/AI teammates can test every endpoint here
without writing any client code.

A demo station (`STATION_1`, 100 kW, 4 chargers) is auto-seeded on startup.
A background loop ticks every 3 seconds and increases battery % for every
charging EV — this is what makes the dashboard feel "live" in the demo.

## 2. Folder Structure

```
gridflow-backend/
├── requirements.txt
├── README.md
└── app/
    ├── main.py           # FastAPI app, CORS, startup seeding, sim launch
    ├── config.py          # tunable constants (grid limit, thresholds...)
    ├── database.py         # SQLAlchemy engine/session (SQLite, swappable)
    ├── models.py            # ORM: Station, Charger, EVSession
    ├── schemas.py             # Pydantic request/response contracts
    ├── crud.py                  # DB operations + calls into ai_engine
    ├── ai_engine.py               # priority scoring + power allocation
    ├── simulation.py                # background battery-% simulation loop
    └── routers/
        ├── stations.py               # station info + admin dashboard
        ├── chargers.py                 # charger status
        ├── sessions.py                   # booking + charging status (Feature 1)
        └── queue.py                        # smart queue (Feature 3)
```

## 3. API Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/sessions/book` | User books a slot (battery%, target%, departure) |
| GET | `/sessions/{session_id}` | Poll live status of one booking |
| GET | `/sessions/user/{user_id}/active` | All bookings for a user |
| PATCH | `/sessions/{session_id}/cancel` | Cancel a booking |
| GET | `/stations/{station_id}/dashboard` | **Everything** the Admin Dashboard needs in one call |
| GET | `/stations/{station_id}` | Station power stats |
| GET | `/chargers/{station_id}` | All chargers + their live status |
| GET | `/queue/{station_id}` | Priority-ranked queue with ETA |

Full request/response shapes are defined in `app/schemas.py` — treat that
file as the contract when building the frontend.

## 4. How the AI hook works (for your AI teammate)

`app/ai_engine.py` exposes exactly two functions the rest of the backend
depends on:

```python
calculate_priority(session) -> float          # 0-100
allocate_power(sessions, grid_limit_kw) -> {session_id: allocated_kw}
```

`crud.recompute_station()` calls these automatically after every booking,
completion, or cancellation. Your AI teammate can rewrite the *inside* of
these two functions (smarter ML model, better ETA logic, etc.) without
touching backend, database, or frontend code — as long as the signatures
stay the same.

## 5. Database (for your DB teammate)

Currently SQLite via SQLAlchemy (zero setup, file-based). To move to
PostgreSQL for the final demo, only `DATABASE_URL` in `config.py` changes —
no model or query code needs to be touched.

Tables: `stations`, `chargers`, `ev_sessions` — fields match Section 8 of
the project spec exactly.

## 6. What's implemented vs. what's stubbed

**Fully working (MUST HAVE, per your priority table):**
- User booking → DB → auto charger assignment
- Dynamic power allocation (priority-weighted, respects grid limit)
- Smart queue with ETA
- Admin dashboard (single endpoint, includes alerts)
- Simulated real-time battery charging + auto session completion
- Smart Charging Alerts (low battery + off-peak) — cheap to include, added

**Not built — flagged because your own priority table marks these
"later" or "skip," and they'd eat into your 2-day budget:**
- Vision-based idle detection (🟢 Later) — `ChargerStatus.OCCUPIED_IDLE`
  exists as a hook in the model so this can be wired in without a schema
  change, but no CV logic is implemented.
- Predictive maintenance / fault detection (voltage, current, temp) —
  there's no real hardware telemetry to detect faults from, and it's
  outside the "software-first simulation" scope you defined. Skip for MVP.
- AI Assistant (natural language Q&A) — doable but is a whole extra
  service (LLM call + prompt design); not worth the time against your
  MUST HAVE list. Could be a stretch goal in the last few hours if the
  core system is solid early.

Suggest keeping the demo focused on the priority-score → dynamic
allocation → live dashboard flow — that's your strongest differentiator
and it's fully working end-to-end right now.
