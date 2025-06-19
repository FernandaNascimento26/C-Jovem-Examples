// Importa os hooks e serviços necessários
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService"; // Serviço para buscar dados do usuário

function Login() {
  // Estado para guardar o email digitado
  const [email, setEmail] = useState("");

  // Estado para guardar a senha digitada
  const [senha, setSenha] = useState("");

  // Estado para mensagens de erro
  const [error, setError] = useState("");

  // Hook para redirecionar o usuário após o login
  const navigate = useNavigate();

  // Função chamada quando o formulário é enviado
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita recarregar a página
    setError(""); // Limpa o erro anterior

    try {
      // Envia o email e senha para o backend e salva o token no localStorage
      await authService.login({ email, senha });

      // Após o login, busca o perfil do usuário
      const response = await userService.getUserProfile();
      const tipo = response.data.tipo; // TIPO1 = admin, TIPO2 = usuário comum

      // Redireciona para a rota certa com base no tipo de usuário
      if (tipo === "TIPO1") {
        navigate("/admin"); // Usuário administrador
      } else {
        navigate("/todos"); // Usuário comum
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      setError("Credenciais inválidas"); // Mostra mensagem de erro
    }
  };

  // Interface do componente (HTML + JSX)
  return (
    <div className="container">
      <h2>Login</h2>

      {/* Se houver erro, exibe a mensagem */}
      {error && <p className="error">{error}</p>}

      {/* Formulário de login */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {/* Link para a página de cadastro */}
      <p>Não tem uma conta? <a href="/register">Cadastre-se</a></p>
    </div>
  );
}

export default Login;
