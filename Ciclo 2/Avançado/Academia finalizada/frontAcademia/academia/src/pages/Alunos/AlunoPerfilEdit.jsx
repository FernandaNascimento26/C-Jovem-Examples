import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import alunoService from '../../services/alunoService';
// alunoService esperado: buscarPorId(id), atualizarAluno(id, payload)

function toDateInput(value){
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}`;
}

export default function AlunoPerfilEdit(){
  const { user } = useAuth();
  const alunoId = user?.aluno_id;

  const [form, setForm] = useState({ nome: '', data_nascimento: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const a = await alunoService.buscarPorId(alunoId);
        setForm({
          nome: a?.nome || '',
          email: a?.email || '',      // se o email for do USER e não puder editar aqui, deixe readOnly
          data_nascimento: toDateInput(a?.data_nascimento),
        });
      } catch (err) {
        setError(err?.response?.data?.error || 'Falha ao carregar seus dados.');
      } finally {
        setLoading(false);
      }
    })();
  }, [alunoId]);

  function onChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e){
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.nome) return setError('Nome é obrigatório.');
    if (!form.data_nascimento) return setError('Data de nascimento é obrigatória.');

    try {
      setSaving(true);
      await alunoService.atualizarAluno(alunoId, {
        nome: form.nome.trim(),
        data_nascimento: form.data_nascimento, // 'YYYY-MM-DD'
        // email: form.email.trim(), // **habilite se o backend permitir editar email aqui**
      });
      setSuccess('Perfil atualizado com sucesso!');
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  if (!alunoId) return <div className="alert alert-warning">Sem aluno associado à sua conta.</div>;

  return (
    <div>
      <h4 className="mb-3">Editar Meu Perfil</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {loading ? <p>Carregando...</p> : (
        <form className="row g-3" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nome *</label>
            <input className="form-control" name="nome" value={form.nome} onChange={onChange}/>
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input className="form-control" name="email" value={form.email} onChange={onChange} readOnly />
            <div className="form-text">O email é gerenciado no cadastro/login.</div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Nascimento *</label>
            <input className="form-control" type="date" name="data_nascimento" value={form.data_nascimento} onChange={onChange}/>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" disabled={saving} type="submit">
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
