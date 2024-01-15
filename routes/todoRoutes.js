const express = require('express');
const router = express.Router();
const ToDoController = require('../controllers/ToDoController');
const { authenticateToken, authorizeUser } = require('../middleware/auth');

// Create a new todo
router.post('/', authenticateToken, ToDoController.createToDo);

// View all todos
router.get('/', authenticateToken, ToDoController.getAllToDos);

// View todo details
router.get('/:id', authenticateToken, ToDoController.getToDoById);

// Edit todo
router.patch('/:id', authenticateToken, authorizeUser, ToDoController.updateToDo);

// Delete todo
router.delete('/:id', authenticateToken, authorizeUser, ToDoController.deleteToDo);

// Delete all todos
router.delete('/', authenticateToken, authorizeUser, ToDoController.deleteAllToDos);

module.exports = router;
