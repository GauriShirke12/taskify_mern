const BASE_URL = "/api/tasks";

export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
}

export async function createTask(task) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("Failed to create task");
  return await res.json();
}
