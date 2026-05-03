from pathlib import Path
from dotenv import load_dotenv

_BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(_BASE_DIR / "env" / "local.env")

import pytest
from sqlalchemy import event
from sqlalchemy.orm import Session

from database.db import engine, get_db


def pytest_addoption(parser):
    parser.addoption(
        "--runslow",
        action="store_true",
        default=False,
        help="run slow tests",
    )


def pytest_collection_modifyitems(config, items):
    if config.getoption("--runslow"):
        return
    skip_slow = pytest.mark.skip(reason="use --runslow to run this test")
    for item in items:
        if "slow" in item.keywords:
            item.add_marker(skip_slow)


@pytest.fixture(scope="module")
def db_engine():
    yield engine


@pytest.fixture(scope="function", autouse=False)
def db_session(monkeypatch):
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)
    session.begin_nested()

    @event.listens_for(session, "after_transaction_end")
    def restart_savepoint(session, transaction):
        if transaction.nested and not transaction._parent.nested:
            session.expire_all()
            session.begin_nested()

    def override_get_db():
        yield session

    monkeypatch.setattr("database.db.get_db", override_get_db)

    yield session

    try:
        session.close()
    except Exception:
        pass

    try:
        if transaction.is_active:
            transaction.rollback()
    except Exception:
        pass

    try:
        connection.close()
    except Exception:
        pass
