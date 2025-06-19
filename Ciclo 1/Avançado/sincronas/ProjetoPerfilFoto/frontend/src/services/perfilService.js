
import api from './api';

export const criarPerfil = (perfilData, token) => {
  return api.post('/perfil', perfilData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const obterPerfil = (token) => {
  return api.get('/perfil', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
