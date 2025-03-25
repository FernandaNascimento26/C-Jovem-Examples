
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarUsuario } from '../services/usuarioService';

export default function CadastroPaciente() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    nome: '', genero: '', data_nasc: '', motivo_terapia: '',
    medicamentos: '', historico_familiar: '', principal_queixa: '',
    email_contato: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data_nasc_iso = new Date(form.data_nasc).toISOString();

    const { confirmarSenha, ...dados } = state;

    try {
      await cadastrarUsuario({
        ...dados,
        ...form,
        data_nasc: data_nasc_iso
      });
      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (error) {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Informações do Paciente</h2>
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
      <button type="submit">Finalizar Cadastro</button>
    </form>
  );
}