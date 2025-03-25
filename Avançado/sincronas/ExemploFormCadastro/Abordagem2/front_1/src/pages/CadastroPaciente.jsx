
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../services/usuarioService';

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '', senha: '', confirmarSenha: '',
    nome: '', genero: '', data_nasc: '', motivo_terapia: '',
    medicamentos: '', historico_familiar: '', principal_queixa: '',
    email_contato: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmarSenha, data_nasc, ...dados } = form;
    const data_nasc_iso = new Date(data_nasc).toISOString();
    try {
      await cadastrarUsuario({ tipo: "PACIENTE", ...dados, data_nasc: data_nasc_iso });
      alert("Usuário cadastrado com sucesso!");
      setForm({
        email: '', senha: '', confirmarSenha: '',
        nome: '', genero: '', data_nasc: '', motivo_terapia: '',
        medicamentos: '', historico_familiar: '', principal_queixa: '',
        email_contato: ''
      });
      navigate('/login');
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} value={form.email} required />
      <input name="senha" type="password" placeholder="Senha" onChange={handleChange} value={form.senha} required />
      <input name="confirmarSenha" type="password" placeholder="Confirmar Senha" onChange={handleChange} value={form.confirmarSenha} required />
      <input name="nome" placeholder="Nome" onChange={handleChange} value={form.nome} required />
      <select name="genero" onChange={handleChange} value={form.genero} required>
        <option value="">Selecione o gênero</option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="OUTRO">Outro</option>
      </select>
      <input name="data_nasc" type="date" onChange={handleChange} value={form.data_nasc} required />
      <input name="motivo_terapia" placeholder="Motivo da Terapia" onChange={handleChange} value={form.motivo_terapia} required />
      <input name="medicamentos" placeholder="Medicamentos" onChange={handleChange} value={form.medicamentos} required />
      <input name="historico_familiar" placeholder="Histórico Familiar" onChange={handleChange} value={form.historico_familiar} required />
      <input name="principal_queixa" placeholder="Principal Queixa" onChange={handleChange} value={form.principal_queixa} required />
      <input name="email_contato" placeholder="Email de Contato" onChange={handleChange} value={form.email_contato} required />
      <button type="submit">Enviar Informações</button>
    </form>
  );
}