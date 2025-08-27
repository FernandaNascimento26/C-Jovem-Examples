import { Link, useParams, useNavigate } from 'react-router-dom'
import data from '../../data/data.json';

export default function ListTreinos(){
  const { alunoId } = useParams()
  const navigate = useNavigate()
  const treinos = data.treinos.filter(t => t.aluno_id === Number(alunoId))

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Treinos do Aluno #{alunoId}</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => navigate('/alunos')}>Voltar</button>
            <Link to={`/alunos/${alunoId}/treinos/novo`} className="btn btn-primary">Novo Treino</Link>
          </div>
        </div>

        {treinos.length === 0 && <p>Nenhum treino cadastrado.</p>}
        {treinos.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Início</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {treinos.map(t => (
                  <tr key={t.id_treino}>
                    <td>{t.id_treino}</td>
                    <td>{t.descricao}</td>
                    <td>{t.data_inicio ? new Date(t.data_inicio).toLocaleDateString() : '-'}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-primary" disabled>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" disabled>Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
