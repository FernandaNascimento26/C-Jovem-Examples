
import api from './api';

export const register = (email, senha) => {
  return api.post('/register', { email, senha });
};

export const login = (email, senha) => {
  return api.post('/login', { email, senha });
};
