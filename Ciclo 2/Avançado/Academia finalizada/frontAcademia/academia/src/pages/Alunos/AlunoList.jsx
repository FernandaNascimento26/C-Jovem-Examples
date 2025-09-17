import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import alunoService from '../../services/alunoService';
// alunoService esperado: listar() -> Promise<Aluno[]>

export default function AlunosList(){
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await alunoService.listar(); // [{id_aluno, nome, email, data_nascimento}]
        setAlunos(data || []);
      } catch (err) {
        const msg = err?.response?.data?.error || 'Falha ao carregar alunos.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Alunos</h4>
        {/* Se quiser um botão de criar aluno separado */}
        <Link className="btn btn-primary" to="/registrar">Novo aluno</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? <p>Carregando...</p> : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map(a => (
                <tr key={a.id_aluno}>
                  <td>{a.id_aluno}</td>
                  <td>{a.nome}</td>
                  <td>{a.email}</td>
                  <td>{a.data_nascimento?.slice(0,10)}</td>
                  <td className="d-flex gap-2">
                    {/* Perfil do aluno (ADMIN/PROF) */}
                    <Link className="btn btn-sm btn-outline-secondary" to={`/aluno/${a.id_aluno}/treinos`}>
                      Treinos
                    </Link>
                    {/* Se quiser abrir um perfil público/admin */}
                    <Link className="btn btn-sm btn-outline-primary" to={`/aluno/${a.id_aluno}`}>
                      Perfil
                    </Link>
                  </td>
                </tr>
              ))}
              {alunos.length === 0 && (
                <tr><td colSpan={5} className="text-center text-muted">Nenhum aluno encontrado.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
