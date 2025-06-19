const Plano = require('../models/planoModel');

/**
 * Lista todos os planos.
 * @param {Object} req - Requisição do Express.
 * @param {Object} res - Resposta do Express.
 */
exports.listarPlanos = async (req, res) => {
  try {
    const planos = await Plano.listarPlanos();
    res.json(planos);
  } catch (error) {
    console.error('❌ ERRO AO LISTAR PLANOS:', error);
    res.status(500).json({ error: error.message || 'Erro ao listar planos' });
  }
};

/**
 * Busca um plano por ID.
 * @param {Object} req - Requisição do Express.
 * @param {Object} res - Resposta do Express.
 */
exports.buscarPlanoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const plano = await Plano.buscarPlanoPorId(Number(id));
    res.json(plano);
  } catch (error) {
    console.error('❌ ERRO AO BUSCAR PLANO:', error);
    res.status(404).json({ error: error.message || 'Plano não encontrado' });
  }
};

/**
 * Cria um novo plano.
 * @param {Object} req - Requisição do Express.
 * @param {Object} res - Resposta do Express.
 */
exports.criarPlano = async (req, res) => {
  try {
    const { descricao, valor, duracao } = req.body;

    // Validação básica
    if (!descricao || !valor || !duracao) {
      return res.status(400).json({ error: 'Descrição, valor e duração são obrigatórios' });
    }

    const novoPlano = await Plano.criarPlano({
      descricao,
      valor: Number(valor),
      duracao: Number(duracao),
    });

    res.status(201).json(novoPlano);
  } catch (error) {
    console.error('❌ ERRO AO CRIAR PLANO:', error);
    res.status(500).json({ error: error.message || 'Erro ao criar plano' });
  }
};

/**
 * Atualiza um plano existente.
 * @param {Object} req - Requisição do Express.
 * @param {Object} res - Resposta do Express.
 */
exports.atualizarPlano = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor, duracao } = req.body;

    // Validação básica
    if (!descricao || !valor || !duracao) {
      return res.status(400).json({ error: 'Descrição, valor e duração são obrigatórios' });
    }

    const planoAtualizado = await Plano.atualizarPlano(Number(id), {
      descricao,
      valor: Number(valor),
      duracao: Number(duracao),
    });

    res.json(planoAtualizado);
  } catch (error) {
    console.error('❌ ERRO AO ATUALIZAR PLANO:', error);
    res.status(500).json({ error: error.message || 'Erro ao atualizar plano' });
  }
};

/**
 * Exclui um plano existente.
 * @param {Object} req - Requisição do Express.
 * @param {Object} res - Resposta do Express.
 */
exports.excluirPlano = async (req, res) => {
    try {
      const { id } = req.params;
      await Plano.excluirPlano(Number(id));
      res.status(204).send();
    } catch (error) {
      console.error('❌ ERRO AO EXCLUIR PLANO:', error);
      res.status(500).json({ error: error.message || 'Erro ao excluir plano' });
    }
  };