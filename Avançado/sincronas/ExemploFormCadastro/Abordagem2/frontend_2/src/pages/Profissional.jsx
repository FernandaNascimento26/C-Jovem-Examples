
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cadastrarUsuario } from '../services/usuarioService';

export default function CadastroProfissional() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    nome: '', matricula_profissional: '', especialidade: '',
    foto_perfil: '', quant_atend_gratis: '', faixas_etarias: [],
    cidade: '', estado: '', genero: '', idade: '', valor: ''
  });

  const opcoesFaixaEtaria = ["CRIANÇA", "ADOLESCENTE", "JOVEM", "ADULTO", "IDOSO"];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCheckboxChange = (e, faixa) => {
    if (e.target.checked) {
      setForm({
        ...form,
        faixas_etarias: [...form.faixas_etarias, faixa]
      });
    } else {
      setForm({
        ...form,
        faixas_etarias: form.faixas_etarias.filter(f => f !== faixa)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmarSenha, ...dados } = state;
    try {
      await cadastrarUsuario({
        ...dados,
        ...form,
        quant_atend_gratis: parseInt(form.quant_atend_gratis),
        idade: parseInt(form.idade),
        valor: parseFloat(form.valor)
      });
      alert("Cadastro realizado com sucesso!");
      navigate('/login');
    } catch (error) {
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Informações do Profissional</h2>
      <input name="nome" placeholder="Nome" onChange={handleChange} value={form.nome} required />
      <input name="matricula_profissional" placeholder="Matrícula Profissional" onChange={handleChange} value={form.matricula_profissional} required />
      <input name="especialidade" placeholder="Especialidade" onChange={handleChange} value={form.especialidade} required />
      <input name="foto_perfil" placeholder="Foto (URL)" onChange={handleChange} value={form.foto_perfil} />
      <input name="quant_atend_gratis" type="number" placeholder="Qtd. Atendimentos Gratuitos" onChange={handleChange} value={form.quant_atend_gratis} required />
      <fieldset>
        <legend>Faixas Etárias</legend>
        {opcoesFaixaEtaria.map((faixa) => (
          <label key={faixa}>
            <input
              type="checkbox"
              name="faixas_etarias"
              value={faixa}
              checked={form.faixas_etarias.includes(faixa)}
              onChange={(e) => handleCheckboxChange(e, faixa)}
            />
            {faixa}
          </label>
        ))}
      </fieldset>
      <input name="cidade" placeholder="Cidade" onChange={handleChange} value={form.cidade} required />
      <input name="estado" placeholder="Estado" onChange={handleChange} value={form.estado} required />
      <select name="genero" onChange={handleChange} value={form.genero} required>
        <option value="">Selecione o gênero</option>
        <option value="MASCULINO">Masculino</option>
        <option value="FEMININO">Feminino</option>
        <option value="OUTRO">Outro</option>
      </select>
      <input name="idade" type="number" placeholder="Idade" onChange={handleChange} value={form.idade} required />
      <input name="valor" type="number" step="0.01" placeholder="Valor da Consulta" onChange={handleChange} value={form.valor} required />
      <button type="submit">Finalizar Cadastro</button>
    </form>
  );
}