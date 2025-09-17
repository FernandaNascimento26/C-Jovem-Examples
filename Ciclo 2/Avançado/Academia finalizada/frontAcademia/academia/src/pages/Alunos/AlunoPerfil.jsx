import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import alunoService from '../../services/alunoService';
// alunoService esperado: buscarPorId(id_aluno) -> Promise<Aluno>

export default function AlunoPerfil({ self = false }){
  const { user } = useAuth();
  const params = useParams();
  const alunoId = self ? user?.aluno_id : params?.id; // /me usa self, /aluno/:id usa params

  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(!!alunoId);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!alunoId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await alunoService.buscarPorId(alunoId);
        setAluno(data);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Falha ao carregar perfil do aluno.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [alunoId]);

  if (!alunoId) return <div className="alert alert-warning">ID de aluno não encontrado.</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>{self ? 'Meu Perfil' : `Perfil do Aluno #${alunoId}`}</h4>
        {self && <Link to="/me/editar" className="btn btn-primary">Editar Perfil</Link>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Carregando...</p> : aluno ? (
        <div className="card">
          <div className="card-body">
            <p><strong>Nome:</strong> {aluno.nome}</p>
            <p><strong>Email:</strong> {aluno.email}</p>
            <p><strong>Nascimento:</strong> {aluno.data_nascimento?.slice(0,10)}</p>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">Aluno não encontrado.</div>
      )}
    </div>
  );
}
