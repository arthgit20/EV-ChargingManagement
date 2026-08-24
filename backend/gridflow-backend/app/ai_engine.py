"""
AI / Dynamic Power Allocation Engine
-------------------------------------
This is the module your AI teammate owns conceptually, but the backend
needs a working version to be demoable end-to-end. The contract below
is fixed - keep these two function signatures stable so Backend never
breaks when AI logic is swapped out for something fancier.

    calculate_priority(session)          -> float (0-100)
    allocate_power(sessions, grid_limit) -> dict[session_id] -> allocated_kw

Everything else inside this file can be freely rewritten by the AI
teammate.
"""
from datetime import datetime
from typing import List, Dict

MIN_CHARGE_KW = 3.0   # floor so no active EV gets starved to 0 kW
MAX_CHARGE_KW = 50.0  # matches DEFAULT_CHARGER_MAX_KW


def calculate_priority(session) -> float:
    """
    Priority score (0-100, higher = charge first).

    Factors:
      - battery_gap   : how much charge is still needed (target - current)
      - urgency       : how little time is left before departure
      - low_battery   : extra weight if battery is critically low

    This is intentionally simple/explainable for a hackathon judge to
    understand in one sentence: "the less time an EV has and the more
    charge it needs, the higher it's prioritized."
    """
    battery_gap = max(session.target_percentage - session.battery_percentage, 0)

    minutes_left = (session.departure_time - datetime.utcnow()).total_seconds() / 60.0
    minutes_left = max(minutes_left, 1)  # avoid div by zero / negative

    # Urgency: inverse of time left, capped so it doesn't blow up for very soon departures
    urgency_score = min(100.0, 600.0 / minutes_left)  # 10 min left -> 60, 60 min left -> 10

    gap_score = battery_gap  # 0-100 naturally

    low_battery_bonus = 15 if session.battery_percentage <= 20 else 0

    # Weighted blend: urgency matters slightly more than raw gap for this demo
    score = (urgency_score * 0.5) + (gap_score * 0.4) + low_battery_bonus
    return round(min(score, 100.0), 2)


def allocate_power(sessions: List, grid_limit_kw: float) -> Dict[str, float]:
    """
    Distributes grid_limit_kw across all 'active' sessions (queued/assigned/
    charging - i.e. anything that should be drawing power right now),
    weighted by priority_score, while respecting MIN/MAX per-EV bounds.

    Returns: { session_id: allocated_kw }
    """
    active = [s for s in sessions if s.charging_status in ("assigned", "charging", "queued")]
    if not active:
        return {}

    total_priority = sum(s.priority_score for s in active) or 1.0
    allocation: Dict[str, float] = {}
    remaining_power = grid_limit_kw

    # Sort highest priority first so top-priority EVs get their fair share
    # before rounding/leftover effects hit lower-priority ones.
    ordered = sorted(active, key=lambda s: s.priority_score, reverse=True)

    for s in ordered:
        share = (s.priority_score / total_priority) * grid_limit_kw
        share = max(MIN_CHARGE_KW, min(share, MAX_CHARGE_KW, remaining_power))
        share = round(share, 2)
        allocation[s.session_id] = share
        remaining_power = max(remaining_power - share, 0)

    return allocation


def estimate_wait_time_minutes(session, position_in_queue: int, avg_session_minutes: float = 25.0) -> float:
    """
    Very simple queue ETA: position * average session duration.
    Good enough for MVP; AI teammate can replace with a smarter model
    (e.g. based on actual battery_gap / allocated_power of EVs ahead).
    """
    return round(position_in_queue * avg_session_minutes, 1)
