import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import treinosService from '../../services/treinoService';
// treinosService esperado: listar() -> Promise<Treino[]>, remover(id)

export default function TreinosList(){
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load(){
    try {
      setLoading(true);
      const data = await treinosService.listar(); // [{id, titulo, descricao, aluno_id, aluno_nome}]
      setTreinos(data || []);
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao carregar treinos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id){
    if (!window.confirm('Excluir este treino?')) return;
    try {
      await treinosService.remover(id);
      await load();
    } catch (err) {
      setError(err?.response?.data?.error || 'Falha ao excluir.');
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Gerenciar Treinos</h4>
        <Link className="btn btn-primary" to="/treinos/novo">Novo Treino</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Carregando...</p> : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Aluno</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {treinos.map(t => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.titulo}</td>
                  <td>{t.aluno_nome || `#${t.aluno_id}`}</td>
                  <td className="d-flex gap-2">
                    <Link className="btn btn-sm btn-outline-primary" to={`/treinos/${t.id}/editar`}>Editar</Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
              {treinos.length === 0 && <tr><td colSpan={4} className="text-center text-muted">Nenhum treino.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
