const Aluno = require('../models/alunoModel');

/**
 * Lista todos os alunos.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.listarAlunos();
    res.json(alunos);
  } catch (error) {
    console.error('❌ ERRO AO LISTAR ALUNOS:', error);
    res.status(500).json({ error: error.message || 'Erro ao listar alunos' });
  }
};

/**
 * Busca um aluno específico por ID.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.buscarAlunoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.buscarAlunoPorId(Number(id));
    res.json(aluno);
  } catch (error) {
    console.error('❌ ERRO AO BUSCAR ALUNO:', error);
    res.status(404).json({ error: error.message || 'Aluno não encontrado' });
  }
};

/**
 * Cria um novo aluno.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.criarAluno = async (req, res) => {
  try {
    const { nome, email, telefone, dataNascimento, endereco, planoId } = req.body;

    // Validação básica dos dados
    if (!nome || !email || !planoId) {
      return res.status(400).json({ error: 'Nome, email e planoId são obrigatórios' });
    }

    // Cria o aluno usando o model
    const novoAluno = await Aluno.criarAluno({
      nome,
      email,
      telefone,
      dataNascimento,
      endereco,
      planoId,
    });

    res.status(201).json(novoAluno);
  } catch (error) {
    console.error('❌ ERRO AO CRIAR ALUNO:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao criar aluno' });
  }
};

/**
 * Atualiza um aluno existente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, dataNascimento, endereco, planoId } = req.body;

    // Validação básica dos dados
    if (!nome || !email || !planoId) {
      return res.status(400).json({ error: 'Nome, email e planoId são obrigatórios' });
    }

    // Atualiza o aluno usando o model
    const alunoAtualizado = await Aluno.atualizarAluno(Number(id), {
      nome,
      email,
      telefone,
      dataNascimento,
      endereco,
      planoId,
    });

    res.json(alunoAtualizado);
  } catch (error) {
    console.error('❌ ERRO AO ATUALIZAR ALUNO:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao atualizar aluno' });
  }
};

/**
 * Exclui um aluno existente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
exports.excluirAluno = async (req, res) => {
  try {
    const { id } = req.params;
    await Aluno.excluirAluno(Number(id));
    res.status(204).send(); // Resposta sem conteúdo
  } catch (error) {
    console.error('❌ ERRO AO EXCLUIR ALUNO:', error);
    res.status(500).json({ error: error.message || 'Erro interno ao excluir aluno' });
  }
};