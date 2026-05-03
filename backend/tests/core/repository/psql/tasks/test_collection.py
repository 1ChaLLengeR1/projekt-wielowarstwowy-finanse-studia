from core.repository.psql.tasks.collection import collection_tasks_psql
from tests.core.repository.psql.tasks.helper import make_task, cleanup_task


class TestCollectionTasksPsql:

    def test_collection_returns_success(self, db_session):
        result = collection_tasks_psql(active=True)
        assert result["status"] == "SUCCESS"
        assert result["status_code"] == 200
        assert isinstance(result["data"], list)

    def test_collection_filters_active_tasks(self, db_session):
        active_task = make_task(db_session, description="Aktywne", active=True)
        inactive_task = make_task(db_session, description="Nieaktywne", active=False)

        result = collection_tasks_psql(active=True)
        ids = [t["id"] for t in result["data"]]
        assert str(active_task.id) in ids
        assert str(inactive_task.id) not in ids

        cleanup_task(db_session, active_task.id)
        cleanup_task(db_session, inactive_task.id)

    def test_collection_filters_inactive_tasks(self, db_session):
        inactive_task = make_task(db_session, description="Nieaktywne", active=False)

        result = collection_tasks_psql(active=False)
        ids = [t["id"] for t in result["data"]]
        assert str(inactive_task.id) in ids

        cleanup_task(db_session, inactive_task.id)
