const express = require('express');
const { getTodos, addTodo, toggleTodo, removeTodo } = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);
router.put('/:id', toggleTodo);
router.delete('/:id', removeTodo);

module.exports = router;