import uuid
from database.tasks.models import Tasks
from core.repository.psql.tasks.delete import delete_task_psql
from tests.core.repository.psql.tasks.helper import make_task


class TestDeleteTaskPsql:

    def test_delete_existing_task_returns_success(self, db_session):
        task = make_task(db_session, description="Do usunięcia")
        result = delete_task_psql(str(task.id))
        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert result["data"]["id"] == str(task.id)

    def test_delete_nonexistent_task_returns_error(self, db_session):
        result = delete_task_psql(str(uuid.uuid4()))
        assert result["status"] == "ERROR"
        assert result["status_code"] == 404

    def test_delete_removes_task_from_db(self, db_session):
        task = make_task(db_session)
        task_id = task.id
        delete_task_psql(str(task_id))
        db_session.expire_all()
        gone = db_session.query(Tasks).filter(Tasks.id == task_id).first()
        assert gone is None
