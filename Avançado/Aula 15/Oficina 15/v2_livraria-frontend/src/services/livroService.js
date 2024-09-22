import axios from 'axios';

const API_URL = 'http://localhost:3000/livros';

export const fetchLivros = () => axios.get(API_URL);
export const adicionarLivro = (livro) => axios.post(API_URL, livro);
export const editarLivro = (id, livro) => axios.put(`${API_URL}/${id}`, livro);
export const deletarLivro = (id) => axios.delete(`${API_URL}/${id}`);
