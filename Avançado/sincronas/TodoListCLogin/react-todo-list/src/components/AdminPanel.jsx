// Importando os hooks e componentes necessários
import { useEffect, useState } from "react";
import Header from "../components/Header";
import todoService from "../services/todoService";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

// Componente da tela de administrador
function AdminPanel() {
  // Lista de tarefas
  const [todos, setTodos] = useState([]);

  // Texto digitado na busca
  const [searchTerm, setSearchTerm] = useState("");

  // Informações do usuário logado
  const [user, setUser] = useState(null);

  // Permite redirecionar para outras páginas
  const navigate = useNavigate();

  // useEffect roda uma vez quando a página carrega
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca dados do usuário logado
        const userData = await userService.getUserProfile();

        // Se não for tipo 1 (admin), redireciona para /todos
        if (userData.data.tipo !== "TIPO1") {
          navigate("/todos");
          return;
        }

        // Guarda o usuário no estado
        setUser(userData.data);

        // Busca todos os todos cadastrados
        const todosData = await todoService.getTodos();
        setTodos(todosData.data);

      } catch (error) {
        // Se der erro, redireciona para login
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]); // Só roda de novo se o navigate mudar

  // Função que exclui uma tarefa
  const handleDelete = async (id) => {
    try {
      await todoService.deleteTodo(id); // chama a API
      // Atualiza a lista removendo o item
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  // Formata a data de criação para exibir em pt-BR
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // Filtra as tarefas com base no texto da busca
  const todosFiltrados = todos.filter((todo) => {
    const termo = searchTerm.toLowerCase(); // deixa tudo minúsculo
    return (
      todo.texto.toLowerCase().includes(termo) || // busca no texto da tarefa
      todo.user?.nome.toLowerCase().includes(termo) // ou no nome do usuário
    );
  });

  // JSX da página
  return (
    <>
      {/* Cabeçalho com campo de busca */}
      <Header onSearch={setSearchTerm} />

      <div className="container">
        <h2>Todos cadastrados:</h2>

        {/* Lista de tarefas filtradas */}
        <ul className="todos-container">
          {todosFiltrados.map((todo) => (
            <li key={todo.id} className={todo.concluida ? "completed" : ""}>
              <p><strong>{todo.texto}</strong></p>
              <p><small><strong>Usuário:</strong> {todo.user?.nome}</small></p>
              <p><small><strong>Criado em:</strong> {formatarData(todo.createdAt)}</small></p>

              {/* Botão de remover tarefa */}
              <button className="remove" onClick={() => handleDelete(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default AdminPanel;
