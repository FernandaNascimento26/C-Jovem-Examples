import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Usa a variável de ambiente
});

export default api;