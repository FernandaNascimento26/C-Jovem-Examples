const prisma = require('../prisma');

const getTreinos = async (aluno_id) => {
  return prisma.treino.findMany({
    where: { aluno_id: Number(aluno_id) },
    orderBy: { data_inicio: 'desc' },
  });
};

const getTreinoById = async (id_treino) => {
  return prisma.treino.findUnique({
    where: { id_treino: Number(id_treino) },
  });
};

const addTreino = async (descricao, data_inicio, aluno_id) => {
  // Se data_inicio vier ''/undefined do front, não envia -> DB aplica now()
  const data = {
    descricao,
    aluno_id: Number(aluno_id),
    ...(data_inicio ? { data_inicio: new Date(data_inicio) } : {}),
  };

  return prisma.treino.create({ data });
};

const updateTreino = async (id_treino, descricao, data_inicio) => {
  const treino = await prisma.treino.findUnique({
    where: { id_treino: Number(id_treino) },
  });
  if (!treino) throw new Error('Treino não encontrado');

  const data = {
    descricao,
    ...(data_inicio ? { data_inicio: new Date(data_inicio) } : {}),
  };

  return prisma.treino.update({
    where: { id_treino: Number(id_treino) },
    data,
  });
};

const deleteTreino = async (id_treino) => {
  const treino = await prisma.treino.findUnique({
    where: { id_treino: Number(id_treino) },
  });
  if (!treino) throw new Error('Treino não encontrado');

  return prisma.treino.delete({
    where: { id_treino: Number(id_treino) },
  });
};

module.exports = {
  getTreinos,
  getTreinoById,
  addTreino,
  updateTreino,
  deleteTreino,
};
