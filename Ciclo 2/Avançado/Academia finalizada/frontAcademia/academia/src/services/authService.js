import api from './api';

async function login(email, password) {
  const { data } = await api.post('/api/auth/login', { email, password });
  return data; // { token, user }
}

async function registerAluno(payload) {
  // { nome, data_nascimento, email, password }
  const { data } = await api.post('/api/auth/register-aluno', payload);
  return data;
}

export default { login, registerAluno };
