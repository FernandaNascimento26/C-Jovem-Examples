// Importa React, Link para navegação e useNavigate para redirecionamento
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Componente Header que recebe uma função onSearch (para busca)
function Header({ onSearch }) {
  const navigate = useNavigate(); // Hook para redirecionar
  const token = localStorage.getItem("token"); // Verifica se o usuário está logado

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/login"); // Redireciona para a tela de login
  };

  return (
    <header className="header">
      {/* Título do app */}
      <h1>Todo App</h1>

      {/* Campo de busca no centro do header */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Buscar tarefa ou usuário"
          className="search-input"
          onChange={(e) => onSearch && onSearch(e.target.value)} // Chama onSearch ao digitar
        />
      </div>

      {/* Navegação à direita do header */}
      <nav>
        {!token ? (
          // Se não estiver logado, mostra botão de login
          <Link to="/login" className="btn">Login</Link>
        ) : (
          // Se estiver logado, mostra os botões de perfil e logout
          <>
            <Link to="/profile" className="btn">Perfil</Link>
            <button onClick={handleLogout} className="btn logout">Logout</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
