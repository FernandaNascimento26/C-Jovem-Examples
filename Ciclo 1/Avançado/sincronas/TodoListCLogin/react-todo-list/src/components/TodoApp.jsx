import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import todoService from "../services/todoService";
import { useNavigate } from "react-router-dom";

function TodoApp() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await todoService.getTodos();
        setLista(response.data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        navigate("/login"); // Se não estiver autenticado, redireciona para login
      }
    };

    fetchTodos();
  }, [navigate]);

  const adicionarTarefa = async () => {
    if (tarefa.trim() === "") {
      alert("Por favor, insira uma tarefa!");
      return;
    }

    try {
      const novaTarefa = { texto: tarefa, concluida: false };
      const response = await todoService.createTodo(novaTarefa);
      setLista([...lista, response.data]);
      setTarefa("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const removerTarefa = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setLista(lista.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
      alert("Você não tem permissão para excluir esta tarefa!");
    }
  };

  const alternarConcluida = async (id, concluida) => {
    try {
      const response = await todoService.updateTodo(id, { concluida: !concluida });
      setLista(lista.map((item) => (item.id === id ? response.data : item)));
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        placeholder="Digite sua tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {lista.map((item) => (
          <TodoItem
            key={item.id}
            texto={item.texto}
            concluida={item.concluida}
            onToggle={() => alternarConcluida(item.id, item.concluida)}
            onRemove={() => removerTarefa(item.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
