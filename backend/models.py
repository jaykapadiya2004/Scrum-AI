from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    assignee: str
    priority: str
    due_date: str  # <-- New field
    status: str = "todo"

class Task(TaskCreate):
    id: int