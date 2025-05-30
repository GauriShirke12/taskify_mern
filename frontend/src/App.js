import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask } from './services/taskService';

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
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task");
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

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
