import api from './api';

export const completarProfissional = (id, data) => {
  return api.put(`/profissionais/${id}`, data);
};