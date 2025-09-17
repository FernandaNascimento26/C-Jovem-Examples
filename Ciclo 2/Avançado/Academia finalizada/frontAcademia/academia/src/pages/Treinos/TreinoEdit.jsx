import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import treinosService from '../../services/treinoService';
// treinosService esperado: buscarPorId(id), atualizar(id, payload)

export default function TreinoEdit(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ titulo: '', descricao: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const t = await treinosService.buscarPorId(id);
        setForm({ titulo: t?.titulo || '', descricao: t?.descricao || '' });
      } catch (err) {
        setError(err?.response?.data?.error || 'Falha ao carregar treino.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  function onChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    if (!form.titulo) return setError('Título é obrigatório.');
    try {
      setSaving(true);
      await treinosService.atualizar(id, {
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim(),
      });
      navigate('/treinos');
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao salvar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h4 className="mb-3">Editar Treino #{id}</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Carregando...</p> : (
        <form className="row g-3" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label className="form-label">Título *</label>
            <input className="form-control" name="titulo" value={form.titulo} onChange={onChange}/>
          </div>
          <div className="col-12">
            <label className="form-label">Descrição</label>
            <textarea className="form-control" rows={4} name="descricao" value={form.descricao} onChange={onChange}/>
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
