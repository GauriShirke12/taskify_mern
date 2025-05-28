import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks().then(data => setTasks(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = await createTask({ title });
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Taskify</h1>
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
