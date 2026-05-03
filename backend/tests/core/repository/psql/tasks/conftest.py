import pytest

_MODULES = [
    "core.repository.psql.tasks.create",
    "core.repository.psql.tasks.collection",
    "core.repository.psql.tasks.update",
    "core.repository.psql.tasks.delete",
    "core.repository.psql.tasks.statistics",
]


@pytest.fixture(autouse=True)
def patch_task_db(db_session, monkeypatch):
    for module in _MODULES:
        monkeypatch.setattr(f"{module}.get_db", lambda: iter([db_session]))
