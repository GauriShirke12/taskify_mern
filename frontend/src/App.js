import React, { useEffect, useState } from 'react';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

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
    <div className="container">
      <h1>Taskify</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New Task"
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              onClick={() => toggleComplete(task)}
              className={task.completed ? 'completed' : ''}
            >
              {task.title}
            </span>
            <div>
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
