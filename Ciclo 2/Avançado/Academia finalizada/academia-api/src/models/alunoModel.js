const prisma = require('../prisma');

/**
 * Lista todos os alunos ordenados do mais novo para o mais antigo.
 */
const getAllAlunos = async () => {
  return prisma.aluno.findMany({
    orderBy: { id_aluno: 'desc' },
  });
};

/**
 * Busca um aluno pelo id.
 */
const getAlunoById = async (id_aluno) => {
  return prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
};

/**
 * Cria um aluno.
 * AJUSTE: não recebe mais email, só nome e data_nascimento.
 */
const addAluno = async (nome, data_nascimento) => {
  return prisma.aluno.create({
    data: { nome, data_nascimento },
  });
};

/**
 * Atualiza um aluno.
 * AJUSTE: não trata mais email; só nome e data_nascimento.
 */
const updateAluno = async (id_aluno, nome, data_nascimento) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
  if (!aluno) throw new Error('Aluno não encontrado');

  // Se data_nascimento vier undefined, não altera o campo
  const data = {
    nome,
    ...(typeof data_nascimento !== 'undefined' ? { data_nascimento } : {}),
  };

  return prisma.aluno.update({
    where: { id_aluno: Number(id_aluno) },
    data,
  });
};

/**
 * Deleta um aluno.
 * Cascade na relação apaga os treinos automaticamente.
 */
const deleteAluno = async (id_aluno) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id_aluno: Number(id_aluno) },
  });
  if (!aluno) throw new Error('Aluno não encontrado');

  return prisma.aluno.delete({
    where: { id_aluno: Number(id_aluno) },
  });
};

/**
 * Conta quantos treinos um aluno possui.
 * Usado como "preview" antes de deletar.
 */
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
