from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.models import Task, TaskCreate
from backend.database import init_db, get_tasks, add_task, update_task
from backend.ai_summary import generate_summary

app = FastAPI()

origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["*"], allow_headers=["*"])

@app.on_event("startup")
def startup():
    init_db()

@app.get("/tasks")
def read_tasks():
    return get_tasks()

@app.post("/tasks")
def create_task(task: TaskCreate):
    return add_task(task)

@app.put("/tasks/{task_id}")
def update_task_status(task_id: int, status: str):
    return update_task(task_id, status)

@app.get("/summary")
def summary():
    tasks = get_tasks()
    return {"summary": generate_summary(tasks)}