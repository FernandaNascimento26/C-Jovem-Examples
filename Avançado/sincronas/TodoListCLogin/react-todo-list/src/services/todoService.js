import api from "./api";

const createTodo = async (todoData) => {
  return api.post("/todos", todoData);
};

const getTodos = async () => {
  return api.get("/todos");
};

const updateTodo = async (id, data) => {
  return api.put(`/todos/${id}`, data);
};

const deleteTodo = async (id) => {
  return api.delete(`/todos/${id}`);
};

export default { createTodo, getTodos, updateTodo, deleteTodo };
