import sqlite3
from backend.models import TaskCreate, Task

def init_db():
    conn = sqlite3.connect("tasks.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    assignee TEXT,
    priority TEXT,
    due_date TEXT,
    status TEXT)''')
    conn.commit()
    conn.close()

def get_tasks():
    conn = sqlite3.connect("tasks.db")
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    rows = c.fetchall()
    conn.close()
    return [{
    "id": r[0],
    "title": r[1],
    "assignee": r[2],
    "priority": r[3],
    "due_date": r[4],
    "status": r[5]
} for r in rows]

def add_task(task: TaskCreate):
    conn = sqlite3.connect("tasks.db")
    c = conn.cursor()
    c.execute("INSERT INTO tasks (title, assignee, priority, due_date, status) VALUES (?, ?, ?, ?, ?)",
          (task.title, task.assignee, task.priority, task.due_date, task.status))
    conn.commit()
    conn.close()
    return {"message": "Task added"}

def update_task(task_id: int, status: str):
    conn = sqlite3.connect("tasks.db")
    c = conn.cursor()
    c.execute("UPDATE tasks SET status = ? WHERE id = ?", (status, task_id))
    conn.commit()
    conn.close()
    return {"message": "Task updated"}