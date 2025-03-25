import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { completarProfissional } from '../services/profissionalService';

function CompletarProfissional() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: state?.nome || '',
    matricula_profissional: '',
    especialidade: '',
    foto_perfil: '',
    quant_atend_gratis: 0,
    faixas_etarias: [],
    cidade: '',
    estado: '',
    genero: 'MASCULINO',
    idade: '',
    valor: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, faixas_etarias: [...prev.faixas_etarias, value] };
      } else {
        return { ...prev, faixas_etarias: prev.faixas_etarias.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completarProfissional(id, {
        ...formData,
        quant_atend_gratis: parseInt(formData.quant_atend_gratis),
        idade: parseInt(formData.idade),
        valor: parseFloat(formData.valor)
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao completar cadastro:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete seu cadastro como Profissional</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Matrícula Profissional */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Matrícula Profissional</label>
            <input
              type="text"
              name="matricula_profissional"
              value={formData.matricula_profissional}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Especialidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Especialidade</label>
            <input
              type="text"
              name="especialidade"
              value={formData.especialidade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Gênero */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gênero</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
            </select>
          </div>

          {/* Idade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Idade</label>
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
              min="18"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Valor por Sessão */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor por Sessão (R$)</label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Atendimentos Gratuitos */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Atendimentos Gratuitos/Mês</label>
            <input
              type="number"
              name="quant_atend_gratis"
              value={formData.quant_atend_gratis}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Cidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Cidade</label>
            <input
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <input
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Faixas Etárias */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Faixas Etárias Atendidas</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {['CRIANÇA', 'ADOLESCENTE', 'JOVEM', 'ADULTO', 'IDOSO'].map(faixa => (
              <div key={faixa} className="flex items-center">
                <input
                  type="checkbox"
                  id={faixa}
                  value={faixa}
                  checked={formData.faixas_etarias.includes(faixa)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor={faixa} className="ml-2 text-sm text-gray-700">
                  {faixa.charAt(0) + faixa.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Foto de Perfil */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Foto de Perfil (URL)</label>
          <input
            type="text"
            name="foto_perfil"
            value={formData.foto_perfil}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Completar Cadastro
        </button>
      </form>
    </div>
  );
}

export default CompletarProfissional;