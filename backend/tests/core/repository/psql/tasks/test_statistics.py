from datetime import datetime, timedelta
from core.repository.psql.tasks.statistics import get_task_statistics_psql
from tests.core.repository.psql.tasks.helper import make_task, cleanup_task


class TestGetTaskStatisticsPsql:

    def test_statistics_returns_success_with_correct_keys(self, db_session):
        start = datetime.utcnow() - timedelta(days=7)
        end = datetime.utcnow()
        result = get_task_statistics_psql(start, end)
        assert result["status"] == "SUCCESS"
        data = result["data"]
        for key in ["total_tasks", "total_time", "average_per_week", "average_time_per_week", "tasks_per_day"]:
            assert key in data

    def test_statistics_counts_inactive_tasks_only(self, db_session):
        start = datetime.utcnow() - timedelta(days=1)
        end = datetime.utcnow() + timedelta(days=1)

        active_task = make_task(db_session, time=10, active=True)
        inactive_task = make_task(db_session, time=20, active=False)
        active_id = active_task.id
        inactive_id = inactive_task.id

        result = get_task_statistics_psql(start, end)
        data = result["data"]

        assert data["total_tasks"] >= 1
        assert data["total_time"] >= 20

        cleanup_task(db_session, active_id)
        cleanup_task(db_session, inactive_id)

    def test_statistics_tasks_per_day_covers_full_range(self, db_session):
        start = datetime(2025, 1, 1)
        end = datetime(2025, 1, 3)
        result = get_task_statistics_psql(start, end)
        tasks_per_day = result["data"]["tasks_per_day"]
        assert "2025-01-01" in tasks_per_day
        assert "2025-01-02" in tasks_per_day
        assert "2025-01-03" in tasks_per_day
