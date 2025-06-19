import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { completarPaciente } from '../services/pacienteService';

function CompletarPaciente() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nome: state?.nome || '',
    genero: 'MASCULINO',
    data_nasc: '',
    motivo_terapia: '',
    medicamentos: '',
    historico_familiar: '',
    principal_queixa: '',
    email_contato: state?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await completarPaciente(id, {
        ...formData,
        data_nasc: new Date(formData.data_nasc).toISOString()
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao completar cadastro:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Complete seu cadastro como Paciente</h1>
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

          {/* Data de Nascimento */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input
              type="date"
              name="data_nasc"
              value={formData.data_nasc}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Email para Contato */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email para Contato</label>
            <input
              type="email"
              name="email_contato"
              value={formData.email_contato}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        </div>

        {/* Motivo da Terapia */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Motivo da Terapia</label>
          <textarea
            name="motivo_terapia"
            value={formData.motivo_terapia}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>

        {/* Medicamentos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicamentos em Uso</label>
          <textarea
            name="medicamentos"
            value={formData.medicamentos}
            onChange={handleChange}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Histórico Familiar */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Histórico Familiar</label>
          <textarea
            name="historico_familiar"
            value={formData.historico_familiar}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {/* Principal Queixa */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Principal Queixa</label>
          <textarea
            name="principal_queixa"
            value={formData.principal_queixa}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
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

export default CompletarPaciente;