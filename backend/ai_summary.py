import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("models/gemini-2.0-flash-lite")

def generate_summary(tasks):
    task_data = "\n".join([f"{t['assignee']} - {t['title']} ({t['status']}) | Priority: {t['priority']} | Due: {t['due_date']}" for t in tasks])

    prompt = f"""
You are an AI Scrum Master. Generate a structured, professional, and non-markdown daily stand-up summary based on the task updates below.

Instructions:
- Group tasks into sections: Completed, In Progress, To Do.
- Show for each task:
  - Assignee
  - Task Title
  - Priority
  - Due Date
- Add a 'Progress Analysis' section that:
  - Comments on team pace
  - Notes any overdue tasks
  - Highlights task-priority alignment
- Add a 'Suggestions' section:
  - Provide actionable next steps
  - Call out delays or bottlenecks
- Do not use *, **, markdown syntax, or emojis.
- Use clear spacing and minimal punctuation for readability.

Task Data:
{task_data}
"""

    response = model.generate_content(prompt)
    return response.text