from core.repository.psql.tasks.create import create_task_psql
from tests.core.repository.psql.tasks.helper import cleanup_task


class TestCreateTaskPsql:

    def test_create_returns_success(self, db_session):
        result = create_task_psql(description="Zadanie testowe", time=45)
        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        cleanup_task(db_session, result["data"]["id"])

    def test_create_stores_correct_data(self, db_session):
        result = create_task_psql(description="Opis zadania", time=60, active=True)
        data = result["data"]
        assert data["description"] == "Opis zadania"
        assert data["time"] == 60
        assert data["active"] is True
        assert "id" in data
        cleanup_task(db_session, data["id"])

    def test_create_inactive_task(self, db_session):
        result = create_task_psql(description="Nieaktywne", time=10, active=False)
        assert result["status"] == "SUCCESS"
        assert result["data"]["active"] is False
        cleanup_task(db_session, result["data"]["id"])
