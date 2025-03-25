import api from './api';

export const criarUsuario = (data) => {
  return api.post('/usuarios', data);
};