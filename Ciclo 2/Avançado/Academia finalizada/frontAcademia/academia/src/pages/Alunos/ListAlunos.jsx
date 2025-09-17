import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ALTERADO: antes lia do data.json; agora importa funções da API
import alunoService from '../../services/alunoService'

// NOVO: formata DATE puro (YYYY-MM-DD no back) para exibição estável (pt-BR)
function formatDateBR(dateValue) {
  if (!dateValue) return '-'
  const d = new Date(dateValue) // aceita 'YYYY-MM-DD' do Postgres/Prisma
  if (isNaN(d.getTime())) return '-'
  // usa UTC para evitar “voltar 1 dia” por timezone
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${dd}/${mm}/${yyyy}`
}

export default function ListAlunos(){
  // NOVO: estados para carregamento/erro e dados vindos da API
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ALTERADO: função agora busca no backend
  async function load(){
    try{
      setLoading(true) // NOVO
      const data = await alunoService.buscarDados() // NOVO
      setAlunos(data) // NOVO
    }catch(e){
      setError('Falha ao carregar alunos.') // NOVO
    }finally{
      setLoading(false) // NOVO
    }
  }

  // ALTERADO: dispara a busca inicial (antes não precisava)
  useEffect(() => { load() }, [])

  // NOVO: exclusão chamando API com preview de treinos
  async function onDelete(id){
    try {
      // NOVO: consulta quantos treinos serão apagados
      const { treinos } = await alunoService.contarTreinos(id)

      // NOVO: confirmação “forte”
      const ok = confirm(
        treinos > 0
          ? `Atenção: este aluno possui ${treinos} treino(s). Ao confirmar, TODOS serão apagados junto com o aluno. Deseja continuar?`
          : 'Deseja apagar este aluno?'
      )
      if (!ok) return

      await alunoService.deletarAluno(id)

      // NOVO: atualiza a lista de forma segura
      setAlunos(prev => prev.filter(a => a.id_aluno !== id))
    } catch (e) {
      console.error(e)
      alert('Falha ao apagar aluno.')
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Alunos</h5>
          <Link to="/alunos/novo" className="btn btn-primary">Novo Aluno</Link>
        </div>

        {/* NOVO: feedbacks de loading/erro */}
        {loading && <p>Carregando...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && alunos.length === 0 && <p>Nenhum aluno cadastrado.</p>}
        {alunos.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Nascimento</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(a => (
                  <tr key={a.id_aluno}>
                    <td>{a.id_aluno}</td>
                    <td>{a.nome || '-'}</td>
                    <td>{a.email}</td>
                    {/* ALTERADO: usa formatador estável para DATE */}
                    <td>{formatDateBR(a.data_nascimento)}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <Link to={`/aluno/${a.id_aluno}/treinos`} className="btn btn-sm btn-outline-secondary">Treinos</Link>
                        {/* ALTERADO: botão Editar agora funciona */}
                        <Link to={`/alunos/${a.id_aluno}/editar`} className="btn btn-sm btn-outline-primary">Editar</Link> {/* NOVO */}
                        {/* ALTERADO: botão Excluir agora faz preview + delete */}
                        <button onClick={() => onDelete(a.id_aluno)} className="btn btn-sm btn-outline-danger">Excluir</button>
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
