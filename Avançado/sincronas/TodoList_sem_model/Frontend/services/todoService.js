import api from './api';

// Busca todas as tarefas
const getTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
};

// Adiciona uma nova tarefa
const addTodo = async (texto) => {
  try {
    const response = await api.post('/todos', { texto, concluida: false });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar tarefa:", error);
    throw error;
  }
};

// Atualiza o status de uma tarefa
const toggleTodo = async (id, concluida) => {
  try {
    const response = await api.put(`/todos/${id}`, { concluida: !concluida });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

// Remove uma tarefa
const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    console.error("Erro ao remover tarefa:", error);
    throw error;
  }
};

export default {
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
};