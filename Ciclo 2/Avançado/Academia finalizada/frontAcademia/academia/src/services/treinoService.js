import api from './api'

// helper central para mensagem de erro (cobre vários formatos)
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

// Lista treinos por aluno
const buscarTreinosbyAluno = async (alunoId) => {
  try {
    const res = await api.get(`/api/treinos/aluno/${Number(alunoId)}`) // <- rota nova
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao listar treinos'))
  }
}

// Busca 1 treino
const buscarTreino = async (id) => {
  try {
    const res = await api.get(`/api/treinos/${Number(id)}`)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao buscar treino'))
  }
}

// Cria treino (prof/admin)
const adicionarTreino = async (alunoId, payload) => {
  try {
    const res = await api.post('/api/treinos', { ...payload, aluno_id: Number(alunoId) })
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao adicionar treino'))
  }
}

// Atualiza treino (prof/admin)
const atualizarTreino = async (id, payload) => {
  try {
    const res = await api.put(`/api/treinos/${Number(id)}`, payload)
    return res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao atualizar treino'))
  }
}

// Deleta treino (prof/admin)
const deletarTreino = async (id) => {
  try {
    const res = await api.delete(`/api/treinos/${Number(id)}`)
    return res.status === 204 ? true : res.data
  } catch (error) {
    throw new Error(getErr(error, 'Falha ao deletar treino'))
  }
}

export default {
  buscarTreinosbyAluno,
  buscarTreino,
  adicionarTreino,
  atualizarTreino,
  deletarTreino,
}
