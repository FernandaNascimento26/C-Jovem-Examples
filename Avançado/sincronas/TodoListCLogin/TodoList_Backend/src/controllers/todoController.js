const { getAllTodos, getTodosByUserId, addTodo, toggleTodo, removeTodo , getTodoById} = require('../models/todoModel');

const getTodosHandler = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.tipo;

    let todos;

    if (userType === "TIPO1") {
      // Admin vê todas as tarefas
      todos = await getAllTodos();
    } else {
      // Usuário padrão vê apenas as suas tarefas
      todos = await getTodosByUserId(userId);
    }

    console.log("Tarefas com dados de usuário:", JSON.stringify(todos, null, 2));

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefas" });
  }
};


const addTodoHandler = async (req, res) => {
  const { texto } = req.body;
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  
  if (!texto) {
    return res.status(400).json({ error: 'Texto da tarefa é obrigatório' });
  }

  try {
    const newTodo = await addTodo(texto,userId);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar tarefa' });
  }
};

const toggleTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    const userId = req.user.userId;
    const userType = req.user.tipo;

    const todo = await getTodoById(id);
    if (!todo) return res.status(404).json({ error: "Tarefa não encontrada" });

    if (userType === "TIPO1" || todo.userId === userId) {
      // Admin pode editar qualquer tarefa, usuário normal só a própria
      const updatedTodo = await toggleTodo(id, concluida);
      return res.json(updatedTodo);
    } else {
      return res.status(403).json({ error: "Você não tem permissão para editar esta tarefa" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

const removeTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userType = req.user.tipo;

    if (userType !== "TIPO1") {
      return res.status(403).json({ 
        error: "Ação proibida: Apenas administradores podem excluir tarefas." 
      });
    }

    const todo = await getTodoById(id);
    if (!todo) return res.status(404).json({ error: "Tarefa não encontrada" });

    await removeTodo(id);
    res.json({ message: "Tarefa removida com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover tarefa" });
  }
};

module.exports = { getTodosHandler, addTodoHandler, toggleTodoHandler, removeTodoHandler };