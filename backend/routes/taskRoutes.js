const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById
} = require('../controllers/taskController');

// GET all tasks
router.get('/', getTasks);

// GET single task by ID
router.get('/:id', getTaskById);

// POST new task
router.post('/', createTask);

// PUT update task
router.put('/:id', updateTask);

// DELETE task
router.delete('/:id', deleteTask);

module.exports = router;
