"""
GridFlow AI - Backend Configuration
------------------------------------
All tunable constants live here so the team doesn't have to hunt
through business logic to change a number for the demo.
"""

# --- Station defaults (used when seeding demo data) ---
DEFAULT_STATION_ID = "STATION_1"
DEFAULT_GRID_LIMIT_KW = 100.0
DEFAULT_NUM_CHARGERS = 4
DEFAULT_CHARGER_MAX_KW = 50.0   # per-charger hardware cap

# --- Simulation engine ---
SIMULATION_TICK_SECONDS = 3     # how often the background loop updates battery %
SIMULATION_KWH_TO_PERCENT = 1.4 # tune so charging visibly progresses within a demo

# --- Alerts (Smart Charging Alerts - lightweight, MVP-safe) ---
LOW_BATTERY_ALERT_THRESHOLD = 20      # % - warn user/admin
OFF_PEAK_START_HOUR = 22              # 10 PM
OFF_PEAK_END_HOUR = 6                 # 6 AM

# --- Database ---
DATABASE_URL = "sqlite:///./gridflow.db"
