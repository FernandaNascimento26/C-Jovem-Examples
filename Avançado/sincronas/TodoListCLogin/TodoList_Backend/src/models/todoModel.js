const prisma = require('../prisma');

const getTodosByUserId = async (userId) => {
  return prisma.todo.findMany({ where: { userId } });
}

const getAllTodos = async () => {
  return prisma.todo.findMany({
    include: {
      user: { select: { nome: true } }, 
    },
    orderBy: { createdAt: "desc" },
  });
};


const getTodoById = async (id) =>{
  return prisma.todo.findUnique({ where: { id: parseInt(id) } });
}

const addTodo = async (texto, userId) => {
  return await prisma.todo.create({
    data: { texto, concluida: false, userId: Number(userId) },
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

module.exports = {getTodoById,getAllTodos, getTodosByUserId, addTodo, toggleTodo, removeTodo };