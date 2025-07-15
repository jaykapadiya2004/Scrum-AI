const backendURL = "http://localhost:8000"; // Replace with deployed URL later

async function loadTasks() {
  const res = await fetch(`${backendURL}/tasks`);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
  const li = document.createElement("li");

  const statusIcons = {
    "todo": "⏳",
    "in progress": "🔄",
    "done": "✅"
  };

  li.innerHTML = `
    <div>
    <strong>${task.assignee}</strong>: ${task.title}
    <br/>
    <span>🎯 <strong>Priority:</strong> ${task.priority || "N/A"}</span>
    <br/>
    <span>📅 <strong>Due:</strong> ${task.due_date || "N/A"}</span>
    <br/>
    <span class="status-badge ${getStatusClass(task.status)}">
      ${statusIcons[task.status] || ""} ${task.status}
    </span>
  </div>
  <select onchange="updateStatus(${task.id}, this.value)">
    <option value="todo" ${task.status === "todo" ? "selected" : ""}>To Do</option>
    <option value="in progress" ${task.status === "in progress" ? "selected" : ""}>In Progress</option>
    <option value="done" ${task.status === "done" ? "selected" : ""}>Done</option>
  </select>
  `;

  list.appendChild(li);
});
}

async function updateStatus(id, status) {
  await fetch(`${backendURL}/tasks/${id}?status=${status}`, { method: "PUT" });
  loadTasks();
}

document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const assignee = document.getElementById("assignee").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  await fetch(`${backendURL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      assignee,
      priority,
      due_date: dueDate
    })
  });

  e.target.reset();
  loadTasks();
});

document.getElementById("generateSummary").addEventListener("click", async () => {
  const res = await fetch(`${backendURL}/summary`);
  const data = await res.json();
  document.getElementById("summaryText").textContent = data.summary;

  // Show modal
  document.getElementById("summaryModal").style.display = "block";
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("summaryModal").style.display = "none";
});

// Optional: Close modal on background click
window.onclick = function(event) {
  const modal = document.getElementById("summaryModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function getStatusClass(status) {
  switch (status) {
    case "todo":
      return "status-todo";
    case "in progress":
      return "status-inprogress";
    case "done":
      return "status-done";
    default:
      return "";
  }
}

loadTasks();

const glow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX - 30;
  mouseY = e.clientY - 30;
});

function animateGlow() {
  glow.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(animateGlow);
}

animateGlow();
const trailContainer = document.getElementById('cursor-trail-container');

document.addEventListener('mousemove', (e) => {
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  trailContainer.appendChild(dot);

  // Clean up after animation
  setTimeout(() => trailContainer.removeChild(dot), 500);
});
document.addEventListener('click', (e) => {
  const pulse = document.createElement('div');
  pulse.className = 'click-pulse';
  pulse.style.left = `${e.clientX}px`;
  pulse.style.top = `${e.clientY}px`;
  document.body.appendChild(pulse);

  setTimeout(() => document.body.removeChild(pulse), 500);
});