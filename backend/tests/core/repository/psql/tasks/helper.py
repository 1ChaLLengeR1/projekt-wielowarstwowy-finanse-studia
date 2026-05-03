import uuid
from database.tasks.models import Tasks


def make_task(db_session, description="Test task", time=30, active=True) -> Tasks:
    task = Tasks(
        description=description,
        time=time,
        active=active,
    )
    db_session.add(task)
    db_session.commit()
    db_session.refresh(task)
    return task


def cleanup_task(db_session, task_id):
    task = db_session.query(Tasks).filter(Tasks.id == task_id).first()
    if task:
        db_session.delete(task)
        db_session.commit()
