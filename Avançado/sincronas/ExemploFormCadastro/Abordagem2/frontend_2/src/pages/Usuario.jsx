
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Usuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '', confirmarSenha: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/cadastro-multi/escolha', { state: form });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crie sua conta</h2>
      <input name="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} value={form.email} required />
      <input name="senha" type="password" placeholder="Senha" onChange={(e) => setForm({ ...form, senha: e.target.value })} value={form.senha} required />
      <input name="confirmarSenha" type="password" placeholder="Confirmar Senha" onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} value={form.confirmarSenha} required />
      <button type="submit">Continuar</button>
    </form>
  );
}