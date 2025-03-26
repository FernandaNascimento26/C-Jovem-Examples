
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useEffect } from 'react';
import { isAutenticado } from '../utils/auth';


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (isAutenticado()) {
      navigate('/perfil');
    }
  }, []);
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, senha);
    localStorage.setItem('token', res.data.token);
    navigate('/perfil');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-light">Login</h2>
      <form onSubmit={handleLogin} className="bg-dark p-4 rounded">
        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Senha</label>
          <input type="password" className="form-control" value={senha} onChange={e => setSenha(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
      <p className="mt-3 text-light">
  Ainda não tem conta? <a href="/">Cadastre-se</a>
</p>

    </div>
  );
}
