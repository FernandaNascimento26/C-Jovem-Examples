import api from './api';

export const buscarDados = async () => api.get('/alunos');
export const buscarDadosAluno = async (id_aluno) => api.get(`/api/alunos/${id_aluno}`);
export const adicionarAluno = async (payload) => api.post(`/api/alunos/`, payload);
export const atualizarAluno = async (id_aluno, payload) => api.put(`/api/alunos/${id_aluno}`, payload);
export const deletarAluno = async (id_aluno) => api.delete(`/alunos/${id_aluno}`);
