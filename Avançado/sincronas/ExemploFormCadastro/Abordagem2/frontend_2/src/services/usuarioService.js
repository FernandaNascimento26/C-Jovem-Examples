import api from './api';

export async function cadastrarUsuario(data) {
  try {
    const res = await api.post('/api/usuarios/cadastro', data);
    return res.data;
  } catch (err) {
    console.error('Erro no cadastro', err);
    throw err;
  }
}
