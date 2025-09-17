import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import treinosService from '../../services/treinoService';
// treinosService esperado: listarPorAluno(alunoId) -> Promise<Treino[]>

export default function MeusTreinos(){
  const { id } = useParams(); // id do aluno
  const [treinos, setTreinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await treinosService.listarPorAluno(id);
        setTreinos(data || []);
      } catch (err) {
        setError(err?.response?.data?.error || 'Falha ao carregar seus treinos.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div>
      <h4 className="mb-3">Meus Treinos</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Carregando...</p> : (
        <div className="list-group">
          {treinos.map(t => (
            <div key={t.id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <strong>{t.titulo}</strong>
                <span className="text-muted">#{t.id}</span>
              </div>
              {t.descricao && <p className="mb-0 mt-1">{t.descricao}</p>}
            </div>
          ))}
          {treinos.length === 0 && <p className="text-muted">Você ainda não possui treinos.</p>}
        </div>
      )}
    </div>
  );
}
