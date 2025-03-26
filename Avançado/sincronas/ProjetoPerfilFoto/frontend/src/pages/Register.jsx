
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { useEffect } from 'react';
import { isAutenticado } from '../utils/auth';


export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (isAutenticado()) {
      navigate('/perfil');
    }
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, senha);
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-light">Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Senha</label>
          <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
        </div>
        <button className="btn btn-purple w-100">Cadastrar</button>
      </form>
      <p className="mt-3 text-light">
  Já tem conta? <a href="/login">Faça login</a>
</p>

    </div>
    
  );
}
