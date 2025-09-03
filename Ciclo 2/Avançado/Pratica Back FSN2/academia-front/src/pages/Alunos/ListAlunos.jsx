import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

//alteração 1: chamada do serviço
//import data from '../../data/data.json'
//import alunoService from '../../services/alunoService' -exemplo 1

import {buscarDados, deletarAluno} from '../../services/alunoService2'

export default function ListAlunos(){
  //const alunos = data.alunos

  //alteração 2: uso do estado 
  const [alunos, setAlunos] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState(null)

  //alteração 3: função para carregar os dados
 async function load(){
    try{
      setLoading(true)
      const {data} = await buscarDados();
      setAlunos(data)
    }

    catch(error){
      setError(error.message)
    }

    finally{
      setLoading(false)
    }
 }

 //alteração 4: useEffect para carregar os dados ao montar o componente
  useEffect(() => { 
    load() 
  }, [])

  //alteração 6: função para deletar aluno
  async function deleteAluno(id_aluno){
    try{
    if(!confirm("Confirma a exclusão do aluno?")) return
       await deletarAluno(id_aluno)
       setAlunos(alunos.filter(a => a.id_aluno !== id_aluno))
  }
    catch(error){
      setError(error.message)
    }
    
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Alunos</h5>
          <Link to="/alunos/novo" className="btn btn-primary">Novo Aluno</Link>
        </div>
        
        {/*alteração 5: feedback para o usuário */}
        {loading && <p>Carregando dados...</p>}
        {error && <p className="alert alert-danger">{"Erro ao carregar alunos"}</p>}
        {alunos.length === 0 && <p>Nenhum aluno cadastrado.</p>}
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
                    <td>{a.data_nas ? new Date(a.data_nas).toLocaleDateString() : '-'}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <Link to={`/alunos/${a.id_aluno}/treinos`} className="btn btn-sm btn-outline-secondary">Treinos</Link>
                         {/*edição: passando a rota de edição*/}
                        <Link to={`/alunos/${a.id_aluno}`} className="btn btn-sm btn-outline-primary">Editar</Link>
                        {/*alteração 7: evento para chamar a função de deletar */}
                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteAluno(a.id_aluno)}>Excluir</button>
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
