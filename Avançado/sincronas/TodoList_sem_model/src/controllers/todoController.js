const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

const addTodo = async (req, res) => {
  const { texto } = req.body;
  if (!texto) {
    return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });
  }

  try {
    const newTodo = await prisma.todo.create({
      data: { texto, concluida: false },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
};

const toggleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
    if (!todo) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { concluida: !todo.concluida },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao alternar tarefa' });
  }
};

const removeTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover tarefa' });
  }
};

module.exports = { getTodos, addTodo, toggleTodo, removeTodo };