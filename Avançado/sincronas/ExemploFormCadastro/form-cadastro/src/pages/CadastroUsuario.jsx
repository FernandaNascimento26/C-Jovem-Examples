import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../services/usuarioService';

function CadastroUsuario() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    tipo: 'PACIENTE'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica no front
    if (!formData.email || !formData.senha || !formData.nome || !formData.tipo) {
      alert("Todos os campos são obrigatórios");
      return;
    }
  
    // Validação de email simples
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Por favor, insira um email válido");
      return;
    }
  
    // Validação de senha (mínimo 6 caracteres)
    if (formData.senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }
  
    try {
      // Exibe os dados que serão enviados para debug
      console.log("Enviando dados:", formData);
      
      const { data } = await criarUsuario({
        email: formData.email.trim(),
        senha: formData.senha,
        nome: formData.nome.trim(),
        tipo: formData.tipo
      });
  
      console.log("Resposta do servidor:", data);
      
      // Redireciona conforme o tipo de usuário
      if (formData.tipo === 'PACIENTE') {
        navigate(`/completar-paciente/${data.perfilId}`, { 
          state: { 
            usuarioId: data.usuarioId,
            email: formData.email,
            nome: formData.nome
          } 
        });
      } else {
        navigate(`/completar-profissional/${data.perfilId}`, { 
          state: { 
            usuarioId: data.usuarioId,
            email: formData.email,
            nome: formData.nome
          } 
        });
      }
  
    } catch (error) {
      console.error("Erro completo:", error);
      
      // Tratamento específico para erros conhecidos
      if (error.response) {
        if (error.response.status === 400) {
          alert(error.response.data.error || "Dados inválidos");
        } else if (error.response.status === 409) {
          alert("Este email já está cadastrado");
        } else {
          alert(`Erro no servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        alert("Não foi possível conectar ao servidor");
      } else {
        alert("Erro ao processar a requisição");
      }
    } 
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Cadastre-se</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de Usuário */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Usuário</label>
          <div className="mt-1 flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tipo"
                value="PACIENTE"
                checked={formData.tipo === 'PACIENTE'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Paciente</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tipo"
                value="PROFISSIONAL"
                checked={formData.tipo === 'PROFISSIONAL'}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Profissional</span>
            </label>
          </div>
        </div>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
            minLength="6"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroUsuario;