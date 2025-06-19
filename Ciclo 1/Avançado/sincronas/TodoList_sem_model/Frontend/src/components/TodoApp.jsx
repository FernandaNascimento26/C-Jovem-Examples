import{ useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import todoService from "../../services/todoService";

function TodoApp() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);

  // Carrega as tarefas ao iniciar o componente
  useEffect(() => {
    carregarTarefas();
  }, []);

  // Função para carregar as tarefas
  const carregarTarefas = async () => {
    try {
      const tarefas = await todoService.getTodos();
      setLista(tarefas);
    } catch (error) {
      alert("Erro ao carregar tarefas!");
    }
  };

  // Função para adicionar uma nova tarefa
  const adicionarTarefa = async () => {
    if (tarefa.trim() === "") {
      alert("Por favor, insira uma tarefa!");
      return;
    }

    try {
      await todoService.addTodo(tarefa);
      setTarefa("");
      carregarTarefas(); // Recarrega a lista após adicionar
    } catch (error) {
      alert("Erro ao adicionar tarefa!");
    }
  };

  // Função para remover uma tarefa
  const removerTarefa = async (id) => {
    try {
      await todoService.deleteTodo(id);
      carregarTarefas(); // Recarrega a lista após remover
    } catch (error) {
      alert("Erro ao remover tarefa!");
    }
  };

  // Função para alternar o status de conclusão
  const alternarConcluida = async (id, concluida) => {
    try {
      await todoService.toggleTodo(id, concluida);
      carregarTarefas(); // Recarrega a lista após atualizar
    } catch (error) {
      alert("Erro ao atualizar tarefa!");
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
            id={item.id}
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