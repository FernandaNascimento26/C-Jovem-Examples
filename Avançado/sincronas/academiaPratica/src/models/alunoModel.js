const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lista todos os alunos com seus planos associados.
 * @returns {Promise<Array>} Lista de alunos.
 */
const listarAlunos = async () => {
  return await prisma.aluno.findMany({
    include: { plano: true },
  });
};

/**
 * Busca um aluno específico por ID.
 * @param {number} id - ID do aluno.
 * @returns {Promise<Object>} Aluno encontrado.
 * @throws {Error} Se o aluno não for encontrado.
 */
const buscarAlunoPorId = async (id) => {
  const aluno = await prisma.aluno.findUnique({
    where: { id },
    include: { plano: true },
  });

  if (!aluno) {
    throw new Error('Aluno não encontrado');
  }

  return aluno;
};

/**
 * Cria um novo aluno.
 * @param {Object} dadosAluno - Dados do aluno a ser criado.
 * @param {string} dadosAluno.nome - Nome do aluno.
 * @param {string} dadosAluno.email - Email do aluno.
 * @param {string} dadosAluno.telefone - Telefone do aluno.
 * @param {string} dadosAluno.dataNascimento - Data de nascimento do aluno (no formato ISO).
 * @param {string} dadosAluno.endereco - Endereço do aluno.
 * @param {number} dadosAluno.planoId - ID do plano associado ao aluno.
 * @returns {Promise<Object>} Aluno criado.
 * @throws {Error} Se o plano não for encontrado.
 */
const criarAluno = async ({ nome, email, telefone, dataNascimento, endereco, planoId }) => {
  // Verifica se o plano existe
  const plano = await prisma.plano.findUnique({
    where: { id: planoId },
  });

  if (!plano) {
    throw new Error('Plano não encontrado');
  }

  // Cria o aluno
  return await prisma.aluno.create({
    data: {
      nome,
      email,
      telefone,
      dataNascimento: new Date(dataNascimento),
      endereco,
      planoId,
    },
  });
};

/**
 * Atualiza um aluno existente.
 * @param {number} id - ID do aluno a ser atualizado.
 * @param {Object} dadosAluno - Dados do aluno a serem atualizados.
 * @returns {Promise<Object>} Aluno atualizado.
 * @throws {Error} Se o aluno não for encontrado.
 */
const atualizarAluno = async (id, { nome, email, telefone, dataNascimento, endereco, planoId }) => {
  // Verifica se o aluno existe
  const aluno = await prisma.aluno.findUnique({
    where: { id },
  });

  if (!aluno) {
    throw new Error('Aluno não encontrado');
  }

  // Atualiza o aluno
  return await prisma.aluno.update({
    where: { id },
    data: {
      nome,
      email,
      telefone,
      dataNascimento: new Date(dataNascimento),
      endereco,
      planoId,
    },
  });
};

/**
 * Exclui um aluno existente.
 * @param {number} id - ID do aluno a ser excluído.
 * @returns {Promise<void>}
 * @throws {Error} Se o aluno não for encontrado.
 */
const excluirAluno = async (id) => {
  // Verifica se o aluno existe
  const aluno = await prisma.aluno.findUnique({
    where: { id },
  });

  if (!aluno) {
    throw new Error('Aluno não encontrado');
  }

  // Exclui o aluno
  await prisma.aluno.delete({
    where: { id },
  });
};

module.exports = {
  listarAlunos,
  buscarAlunoPorId,
  criarAluno,
  atualizarAluno,
  excluirAluno,
};