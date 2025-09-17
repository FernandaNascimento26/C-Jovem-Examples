import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alunoService from '../../services/alunoService';
import treinosService from '../../services/treinoService';
// treinosService esperado: criar({ aluno_id, titulo, descricao })
// alunoService esperado: listar() para o select

export default function TreinoCreate(){
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({ aluno_id: '', titulo: '', descricao: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const list = await alunoService.listar();
        setAlunos(list || []);
      } catch {
        setAlunos([]);
      }
    })();
  }, []);

  function onChange(e){
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e){
    e.preventDefault();
    setError('');
    if (!form.aluno_id) return setError('Selecione um aluno.');
    if (!form.titulo) return setError('Título é obrigatório.');
    try {
      setSaving(true);
      await treinosService.criar({
        aluno_id: Number(form.aluno_id),
        titulo: form.titulo.trim(),
        descricao: form.descricao.trim(),
      });
      navigate('/treinos');
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao criar treino.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h4 className="mb-3">Novo Treino</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-6">
          <label className="form-label">Aluno *</label>
          <select className="form-select" name="aluno_id" value={form.aluno_id} onChange={onChange}>
            <option value="">Selecione...</option>
            {alunos.map(a => (
              <option key={a.id_aluno} value={a.id_aluno}>
                #{a.id_aluno} - {a.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Título *</label>
          <input className="form-control" name="titulo" value={form.titulo} onChange={onChange}/>
        </div>
        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea className="form-control" rows={4} name="descricao" value={form.descricao} onChange={onChange}/>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
