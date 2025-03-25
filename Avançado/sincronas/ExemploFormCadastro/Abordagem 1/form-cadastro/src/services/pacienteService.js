import api from './api';

export const completarPaciente = (id, data) => {
  return api.put(`/pacientes/${id}`, data);
};