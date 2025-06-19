const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Lista todos os planos.
 * @returns {Promise<Array>} Lista de planos.
 */
const listarPlanos = async () => {
  return await prisma.plano.findMany();
};

/**
 * Busca um plano por ID.
 * @param {number} id - ID do plano.
 * @returns {Promise<Object>} Plano encontrado.
 * @throws {Error} Se o plano não for encontrado.
 */
const buscarPlanoPorId = async (id) => {
  const plano = await prisma.plano.findUnique({
    where: { id },
  });

  if (!plano) {
    throw new Error('Plano não encontrado');
  }

  return plano;
};

/**
 * Cria um novo plano.
 * @param {Object} dadosPlano - Dados do plano.
 * @param {string} dadosPlano.descricao - Descrição do plano.
 * @param {number} dadosPlano.valor - Valor do plano.
 * @param {number} dadosPlano.duracao - Duração do plano em dias.
 * @returns {Promise<Object>} Plano criado.
 */
const criarPlano = async ({ descricao, valor, duracao }) => {
  return await prisma.plano.create({
    data: { descricao, valor, duracao },
  });
};

/**
 * Atualiza um plano existente.
 * @param {number} id - ID do plano.
 * @param {Object} dadosPlano - Dados atualizados do plano.
 * @returns {Promise<Object>} Plano atualizado.
 * @throws {Error} Se o plano não for encontrado.
 */
const atualizarPlano = async (id, { descricao, valor, duracao }) => {
  // Verifica se o plano existe
  const plano = await prisma.plano.findUnique({
    where: { id },
  });

  if (!plano) {
    throw new Error('Plano não encontrado');
  }

  return await prisma.plano.update({
    where: { id },
    data: { descricao, valor, duracao },
  });
};

/**
 * Exclui um plano existente.
 * @param {number} id - ID do plano.
 * @returns {Promise<void>}
 * @throws {Error} Se o plano não for encontrado.
 */
const excluirPlano = async (id) => {
  // Verifica se o plano existe
  const plano = await prisma.plano.findUnique({
    where: { id },
  });

  if (!plano) {
    throw new Error('Plano não encontrado');
  }

  await prisma.plano.delete({
    where: { id },
  });
};

module.exports = {
  listarPlanos,
  buscarPlanoPorId,
  criarPlano,
  atualizarPlano,
  excluirPlano,
};