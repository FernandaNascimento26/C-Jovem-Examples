const prisma = require('../prisma');

const getAllAlunos = async () => {
  return prisma.aluno.findMany({
    orderBy: { id_aluno: 'desc' },
  });
};

const getAlunoById = async (id_aluno) => {
  return prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
};

const addAluno = async (nome, data_nascimento, email) => {
  return prisma.aluno.create({
    data: { nome, data_nascimento, email },
  });
};

const updateAluno = async (id_aluno, nome, data_nascimento, email) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
  if (!aluno) throw new Error('Aluno não encontrado');

  // Se data_nascimento vier undefined, não altera o campo
  const data = {
    nome,
    email,
    ...(typeof data_nascimento !== 'undefined' ? { data_nascimento } : {}),
  };

  return prisma.aluno.update({
    where: { id_aluno: Number(id_aluno) },
    data,
  });
};

const deleteAluno = async (id_aluno) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
  if (!aluno) throw new Error('Aluno não encontrado');

  // CASCADE na relação apaga os treinos
  return prisma.aluno.delete({
    where: { id_aluno: Number(id_aluno) },
  });
};

// “preview” no front antes de deletar
const countTreinosByAluno = async (id_aluno) => {
  return prisma.treino.count({
    where: { aluno_id: Number(id_aluno) },
  });
};

module.exports = {
  getAllAlunos,
  getAlunoById,
  addAluno,
  updateAluno,
  deleteAluno,
  countTreinosByAluno, 
};
