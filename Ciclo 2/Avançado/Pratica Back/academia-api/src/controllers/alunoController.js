const {
  getAllAlunos,
  getAlunoById,
  addAluno,
  updateAluno,
  deleteAluno,
  countTreinosByAluno,
} = require('../models/alunoModel');

const getAllAlunosHandler = async (req, res) => {
  try {
    const alunos = await getAllAlunos();
    res.status(200).json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao buscar alunos' });
  }
};

const getAlunoByIdHandler = async (req, res) => {
  const id = parseInt(req.params.id_aluno);
  try {
    const aluno = await getAlunoById(id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

const addAlunoHandler = async (req, res) => {
  const { nome, data_nascimento, email } = req.body;

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
  if (!data_nascimento || data_nascimento.trim() === '')
    return res.status(400).json({ error: 'data_nascimento é obrigatória (YYYY-MM-DD)' });

  try {
    const aluno = await addAluno(nome, data_nascimento, email);
    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao criar aluno' });
  }
};

const updateAlunoHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno);
  const { nome, data_nascimento, email } = req.body;

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });
  if (typeof data_nascimento !== 'undefined' && data_nascimento.trim() === '')
    return res.status(400).json({ error: 'data_nascimento inválida (YYYY-MM-DD)' });

  try {
    const aluno = await updateAluno(id_aluno, nome, data_nascimento, email);
    res.status(200).json(aluno);
  } catch (error) {
    if (error.message === 'Aluno não encontrado')
      return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
};

// PREVIEW: quantos treinos serão apagados
const getAlunoTreinosCountHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno);
  try {
    const total = await countTreinosByAluno(id_aluno);
    res.status(200).json({ treinos: total });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao contar treinos do aluno' });
  }
};

const deleteAlunoHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno);
  try {
    const total = await countTreinosByAluno(id_aluno);
    await deleteAluno(id_aluno); // CASCADE apaga treinos
    res.status(200).json({ message: 'Aluno e treinos deletados', treinosApagados: total });
  } catch (error) {
    if (error.message === 'Aluno não encontrado')
      return res.status(404).json({ error: 'Aluno não encontrado' });
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
};

module.exports = {
  getAllAlunosHandler,
  getAlunoByIdHandler,
  addAlunoHandler,
  updateAlunoHandler,
  deleteAlunoHandler,
  getAlunoTreinosCountHandler,
};
