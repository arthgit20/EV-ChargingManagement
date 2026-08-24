"""
Database engine + session management.

Using SQLite for the hackathon (zero setup). To swap to PostgreSQL later,
just change DATABASE_URL in config.py to something like:
  postgresql://user:password@localhost/gridflow
No other code needs to change - SQLAlchemy handles the rest.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import DATABASE_URL

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency - yields a DB session per request and closes it after."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
