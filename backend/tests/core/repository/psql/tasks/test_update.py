from core.repository.psql.tasks.update import update_task_psql, update_task_active_psql
from tests.core.repository.psql.tasks.helper import make_task, cleanup_task


class TestUpdateTaskPsql:

    def test_update_description_and_time(self, db_session):
        task = make_task(db_session, description="Stary opis", time=30)
        result = update_task_psql(str(task.id), "Nowy opis", 90)
        assert result["status"] == "SUCCESS"
        assert result["data"]["description"] == "Nowy opis"
        assert result["data"]["time"] == 90
        cleanup_task(db_session, task.id)

    def test_update_nonexistent_task_returns_error(self, db_session):
        import uuid
        result = update_task_psql(str(uuid.uuid4()), "Opis", 10)
        assert result["status"] == "ERROR"
        assert result["status_code"] == 400


class TestUpdateTaskActivePsql:

    def test_deactivate_task(self, db_session):
        task = make_task(db_session, active=True)
        result = update_task_active_psql(str(task.id), False)
        assert result["status"] == "SUCCESS"
        assert result["data"]["active"] is False
        cleanup_task(db_session, task.id)

    def test_activate_task(self, db_session):
        task = make_task(db_session, active=False)
        result = update_task_active_psql(str(task.id), True)
        assert result["status"] == "SUCCESS"
        assert result["data"]["active"] is True
        cleanup_task(db_session, task.id)

    def test_update_active_nonexistent_returns_error(self, db_session):
        import uuid
        result = update_task_active_psql(str(uuid.uuid4()), False)
        assert result["status"] == "ERROR"
        assert result["status_code"] == 400
