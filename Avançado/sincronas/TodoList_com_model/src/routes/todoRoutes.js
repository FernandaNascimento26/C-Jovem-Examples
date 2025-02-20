const express = require('express');
const { getTodosHandler, addTodoHandler, toggleTodoHandler, removeTodoHandler } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodosHandler);
router.post('/', addTodoHandler);
router.put('/:id', toggleTodoHandler);
router.delete('/:id', removeTodoHandler);

module.exports = router;