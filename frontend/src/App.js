import React, { useEffect, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError("Failed to load tasks");
      }
    };

    loadTasks();
  }, []);

  // Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await createTask({ title });
      setTasks(prev => [...prev, newTask]);
      setTitle('');
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
    }
  };

  // Toggle completion
  const toggleComplete = async (task) => {
    try {
      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks(prev =>
        prev.map(t => (t._id === task._id ? updated : t))
      );
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Taskify</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul style={{ marginTop: '1rem' }}>
        {tasks.map(task => (
          <li key={task._id} style={{ marginBottom: '0.5rem' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => toggleComplete(task)}
            >
              {task.title} {task.completed ? '✅' : '❌'}
            </span>
            <button
              style={{ marginLeft: '1rem' }}
              onClick={() => handleDelete(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
