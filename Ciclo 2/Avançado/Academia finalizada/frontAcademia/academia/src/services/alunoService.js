import api from './api'

function getErr(error, fallback) {
  const data = error?.response?.data
  return (
    (typeof data === 'string' && data) ||
    data?.error ||
    data?.message ||
    error?.message ||
    fallback
  )
}

// Lista todos os alunos (prof/admin)
const buscarDados = async () => {
  try {
    const res = await api.get('/api/alunos')
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao carregar alunos'))
  }
}

// Busca 1 aluno (self/prof/admin)
const buscarDadosAluno = async (id) => {
  try {
    const res = await api.get(`/api/alunos/${Number(id)}`)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao carregar aluno'))
  }
}

// Cria aluno (prof/admin)
const adicionarAluno = async (payload) => {
  try {
    // payload: { nome, data_nascimento }
    const res = await api.post('/api/alunos', payload)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao adicionar aluno'))
  }
}

// Atualiza aluno (self/admin)
const atualizarAluno = async (id, payload) => {
  try {
    // payload: { nome, data_nascimento }
    const res = await api.put(`/api/alunos/${Number(id)}`, payload)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao atualizar aluno'))
  }
}

// Deleta aluno (prof/admin)
const deletarAluno = async (id) => {
  try {
    const res = await api.delete(`/api/alunos/${Number(id)}`)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao deletar aluno'))
  }
}

// Preview: quantos treinos serão apagados
const contarTreinos = async (id) => {
  try {
    const res = await api.get(`/api/alunos/${Number(id)}/treinos/count`)
    return res.data // { treinos: number }
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao contar treinos do aluno'))
  }
}

export default {
  buscarDados,
  buscarDadosAluno,
  adicionarAluno,
  atualizarAluno,
  deletarAluno,
  contarTreinos,
}
