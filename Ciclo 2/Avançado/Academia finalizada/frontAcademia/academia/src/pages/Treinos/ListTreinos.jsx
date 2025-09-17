import { Link, useParams, useNavigate } from 'react-router-dom'
// ALTERADO: antes lia do data.json; agora consulta API + delete
import treinoService from '../../services/treinoService' // NOVO
import { useEffect, useState } from 'react'

export default function ListTreinos(){
  const { alunoId } = useParams()
  const navigate = useNavigate()

 // NOVO: estados para dados/erro/loading
  const [treinos, setTreinos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

    // ALTERADO: agora carrega do backend por alunoId
  async function load() {
  try {
    setLoading(true);
    const data = await treinoService.buscarTreinosbyAluno(alunoId);
    setTreinos(Array.isArray(data) ? data : []);
    setError('');
  } catch (e) {
    setError('Falha ao carregar treinos (aluno pode não existir).');
    setTreinos([]);
  } finally {
    setLoading(false);
  }
}
  // ALTERADO: hook para buscar ao entrar/alterar alunoId
  useEffect(() => { load() }, [alunoId])

  // NOVO: exclusão via API
  async function onDelete(id){
    if(!confirm('Apagar este treino?')) return
    await treinoService.deletarTreino(id)
    setTreinos(treinos.filter(t => t.id_treino !== id))
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Treinos do Aluno #{alunoId}</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={() => navigate('/alunos')}>Voltar</button>
           {/* ALTERADO: botão continua igual; lista agora vem da API */}
            <Link to={`/alunos/${alunoId}/treinos/novo`} className="btn btn-primary">Novo Treino</Link>
          </div>
        </div>

        {/* NOVO: feedbacks */}
        {loading && <p>Carregando...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && treinos.length === 0 && <p>Nenhum treino cadastrado.</p>}
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
                        {/* ALTERADO: botão Editar agora funciona */}
                        <Link to={`/alunos/${alunoId}/treinos/${t.id_treino}/editar`} className="btn btn-sm btn-outline-primary">Editar</Link>
                         {/* ALTERADO: botão Excluir agora funciona */}
                        <button onClick={() => onDelete(t.id_treino)} className="btn btn-sm btn-outline-danger">Excluir</button>
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
