import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Usa a variável de ambiente
    timeout: 10000, // 10 segundos de timeout
    headers: {
        'Content-Type': 'application/json',
    },
});



// NOVO: injeta Authorization: Bearer <token> se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default api;