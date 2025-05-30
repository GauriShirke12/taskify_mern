const mongoose = require('mongoose');
const Task = require('../models/taskModel');

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const newTask = new Task({ title, description });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// Update a task by ID
// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};


// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne(); // modern and preferred over .remove()
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid Task ID' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
};
