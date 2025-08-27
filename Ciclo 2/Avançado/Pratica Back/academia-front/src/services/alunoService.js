import api from './api';

const buscarAlunos = async () => {
  try {
    const res = await api.get('/alunos');          
    return res.data;
  } catch (error) {
    rethrow(error, 'Falha ao listar alunos');
  }
};

const buscarDadosAluno = async (id_aluno) => {
  try {
    const res = await api.get(`/alunos/${Number(id_aluno)}`);
    return res.data;
  } catch (error) {
    rethrow(error, 'Falha ao buscar aluno');
  }
};

const adicionarAluno = async (payload) => {
  try {
    const res = await api.post('/alunos', payload);
    return res.data;
  } catch (error) {
    rethrow(error, 'Falha ao adicionar aluno');
  }
};

const atualizarAluno = async (id_aluno, payload) => {
  try {
    const res = await api.put(`/alunos/${Number(id_aluno)}`, payload); 
    return res.data;
  } catch (error) {
    rethrow(error, 'Falha ao atualizar aluno');
  }
};

const deletarAluno = async (id_aluno) => {
  try {
    const res = await api.delete(`alunos/${Number(id_aluno)}`);
    return res.status === 204 ? true : res.data;
  } catch (error) {
    rethrow(error, 'Falha ao deletar aluno');
  }
};

export default {
    buscarAlunos,
    buscarDadosAluno,
    adicionarAluno,
    atualizarAluno,
    deletarAluno
};