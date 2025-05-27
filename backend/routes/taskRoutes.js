const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById  // <-- include the new controller here
} = require('../controllers/taskController');

router.get('/', getTasks);
router.get('/:id', getTaskById);  // <-- add single task GET route
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
