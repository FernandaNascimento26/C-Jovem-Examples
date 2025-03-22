const express = require('express');
const { getTodosHandler, addTodoHandler, toggleTodoHandler, removeTodoHandler } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.get('/', authMiddleware, getTodosHandler);
router.post('/', authMiddleware, addTodoHandler);
router.put('/:id', authMiddleware, toggleTodoHandler);
router.delete('/:id', authMiddleware, removeTodoHandler);

module.exports = router;
