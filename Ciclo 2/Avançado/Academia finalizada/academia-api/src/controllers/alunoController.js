const {
  getAllAlunos,
  getAlunoById,
  addAluno,
  updateAluno,
  deleteAluno,
  countTreinosByAluno,
} = require('../models/alunoModel')

/**
 * GET /alunos
 * Lista todos os alunos (professor/admin pelas rotas).
 */
const getAllAlunosHandler = async (req, res) => {
  try {
    const alunos = await getAllAlunos()
    res.status(200).json(alunos)
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao buscar alunos' })
  }
}

/**
 * GET /alunos/:id_aluno
 * Retorna um aluno pelo id.
 */
const getAlunoByIdHandler = async (req, res) => {
  const id = parseInt(req.params.id_aluno)
  try {
    const aluno = await getAlunoById(id)
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' })
    res.status(200).json(aluno)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aluno' })
  }
}

/**
 * POST /alunos
 * Cria um aluno (sem user). 
 * – A conta do usuário/aluno é criada no fluxo de autenticação, não aqui.
 */
const addAlunoHandler = async (req, res) => {
  const { nome, data_nascimento } = req.body

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })
  if (!data_nascimento || data_nascimento.trim() === '')
    return res.status(400).json({ error: 'data_nascimento é obrigatória (YYYY-MM-DD)' })

  try {
    const aluno = await addAluno(nome, data_nascimento)
    res.status(201).json(aluno)
  } catch (error) {
    res.status(500).json({ error: error.message || 'Erro ao criar aluno' })
  }
}

/**
 * PUT /alunos/:id_aluno
 * Atualiza dados do aluno (nome, data_nascimento).
 */
const updateAlunoHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno)
  const { nome, data_nascimento } = req.body

  if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })
  if (typeof data_nascimento !== 'undefined' && data_nascimento.trim() === '')
    return res.status(400).json({ error: 'data_nascimento inválida (YYYY-MM-DD)' })

  try {
    const aluno = await updateAluno(id_aluno, nome, data_nascimento)
    res.status(200).json(aluno)
  } catch (error) {
    if (error.message === 'Aluno não encontrado')
      return res.status(404).json({ error: 'Aluno não encontrado' })
    res.status(500).json({ error: 'Erro ao atualizar aluno' })
  }
}

/**
 * GET /alunos/:id_aluno/treinos/count
 * Conta treinos do aluno (preview de deleção).
 */
const getAlunoTreinosCountHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno)
  try {
    const total = await countTreinosByAluno(id_aluno)
    res.status(200).json({ treinos: total })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao contar treinos do aluno' })
  }
}

/**
 * DELETE /alunos/:id_aluno
 * Deleta aluno; treinos são apagados por cascade.
 * (user vinculado deve ser tratado no fluxo de user, se aplicável)
 */
const deleteAlunoHandler = async (req, res) => {
  const id_aluno = parseInt(req.params.id_aluno)
  try {
    const total = await countTreinosByAluno(id_aluno)
    await deleteAluno(id_aluno)
    res.status(200).json({ message: 'Aluno e treinos deletados', treinosApagados: total })
  } catch (error) {
    if (error.message === 'Aluno não encontrado')
      return res.status(404).json({ error: 'Aluno não encontrado' })
    res.status(500).json({ error: 'Erro ao deletar aluno' })
  }
}

module.exports = {
  getAllAlunosHandler,
  getAlunoByIdHandler,
  addAlunoHandler,
  updateAlunoHandler,
  deleteAlunoHandler,
  getAlunoTreinosCountHandler,
}
