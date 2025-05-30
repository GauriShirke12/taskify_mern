const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/tasks"
    : "/api/tasks";

// Get all tasks
export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
}

// Create a new task
export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json();
}

// Update a task by ID
export async function updateTask(id, updatedData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
}

// Delete a task by ID
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return await res.json();
}
