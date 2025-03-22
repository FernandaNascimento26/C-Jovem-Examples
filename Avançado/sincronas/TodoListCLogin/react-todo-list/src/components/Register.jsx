// Importa React e os hooks necessários
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Serviço de autenticação

function Register() {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Define o tipo de usuário como "TIPO2" (usuário comum) por padrão
  const [tipo, setTipo] = useState("TIPO2");

  // Estado para mensagens de erro e sucesso
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Permite redirecionar o usuário

  // Função chamada ao enviar o formulário
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    setError("");       // Limpa mensagens anteriores
    setSuccess("");

    const userData = { nome, email, senha, tipo };
    console.log("Enviando dados:", userData); // (Opcional) Debug no console

    try {
      // Envia os dados para o backend via authService
      await authService.register(userData);

      // Exibe mensagem de sucesso
      setSuccess("Cadastro realizado com sucesso! Redirecionando...");

      // Limpa os campos do formulário
      setNome("");
      setEmail("");
      setSenha("");

      // Aguarda 2 segundos e redireciona para login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Se der erro, mostra a mensagem vinda do backend ou uma genérica
      setError(error.response?.data?.error || "Erro ao registrar usuário.");
    }
  };

  // JSX da interface
  return (
    <div className="container">
      <h2>Cadastro</h2>

      {/* Mostra mensagens de erro ou sucesso se existirem */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Formulário de cadastro */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      {/* Link para quem já tem conta */}
      <p>Já tem uma conta? <a href="/login">Faça login</a></p>
    </div>
  );
}

export default Register;
