const prisma = require('../prisma');

const getTodos = async () => {
  return await prisma.todo.findMany();
};

const addTodo = async (texto) => {
  return await prisma.todo.create({
    data: { texto, concluida: false },
  });
};

const toggleTodo = async (id) => {
  const todo = await prisma.todo.findUnique({ where: { id: Number(id) } });
  if (!todo) {
    throw new Error('Tarefa não encontrada');
  }

  return await prisma.todo.update({
    where: { id: Number(id) },
    data: { concluida: !todo.concluida },
  });
};

const removeTodo = async (id) => {
  return await prisma.todo.delete({ where: { id: Number(id) } });
};

module.exports = { getTodos, addTodo, toggleTodo, removeTodo };