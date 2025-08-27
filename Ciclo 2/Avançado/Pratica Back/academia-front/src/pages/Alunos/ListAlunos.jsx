import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
//import data from '../../data/data.json'

//Alteração 1: chamada do serviço
//import alunosService from '../../services/alunoService'; -exemplo 1
import {buscarDados,deletarAluno} from '../../services/alunoService2' //exemplo 2

export default function ListAlunos(){
  //const alunos = data.alunos

  //Alteração 2: criação do estado
  const[alunos,setAlunos] = useState([])
  const[loading, setLoading] = useState(true)
  const[error, setError] = useState(null)

  //Alteração 3: Função para carregar os dados
  async function load(){
    try{
      setLoading(true)
      //const data = await alunosService.buscarAlunos()
      const {data} = await buscarDados()
      setAlunos(data)
    }
    catch(error){
      setError(error)
    }
    finally{
      setLoading(false)
    }
  }

  //Alteração 4: dispara a busca inicial na montagem do componente
  useEffect(()=>{
    load()
  },[])


//Alteração 6: função para deletar
async function handleDelete(id_aluno){
    return await deletarAluno(id_aluno)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Alunos</h5>
          <Link to="/alunos/novo" className="btn btn-primary">Novo Aluno</Link>
        </div>


        {/*Alteração 5: mensagens de loading e erro*/}
        {loading && <p>Carregando...</p>}
        {error && <p className="alert alert-danger">Erro: {'Falha ao carregar alunos'}</p>}
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
                    <td>{a.data_nascimento ? new Date(a.data_nascimento).toLocaleDateString() : '-'}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <Link to={`/alunos/${a.id_aluno}/treinos`} className="btn btn-sm btn-outline-secondary">Treinos</Link>
                        <button className="btn btn-sm btn-outline-primary" disabled>Editar</button>
                        {/*Alteração 6: chamada da função de deletar*/}
                        <button className="btn btn-sm btn-outline-danger" onClick={()=> handleDelete(a.id_aluno)} >Excluir</button>
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
