const { getTodos, addTodo, toggleTodo, removeTodo } = require('../models/todoModel');

const getTodosHandler = async (req, res) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const addTodoHandler = async (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });
  }

  try {
    const newTodo = await addTodo(texto);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
};

const toggleTodoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTodo = await toggleTodo(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alternar tarefa' });
  }
};

const removeTodoHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await removeTodo(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
};

module.exports = { getTodosHandler, addTodoHandler, toggleTodoHandler, removeTodoHandler };