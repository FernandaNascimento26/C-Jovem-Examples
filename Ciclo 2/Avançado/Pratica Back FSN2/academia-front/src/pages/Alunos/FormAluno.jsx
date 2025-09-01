import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//ALTERAÇÃO 1: importação do serviço
import alunoService from '../../services/alunoService' //- exemplo 1
//import { adicionarAluno } from '../../services/alunoService2' - exemplo 2

export default function FormAluno(){
  const navigate = useNavigate()

  const [form, setForm] = useState({ nome: '', email: '', data_nas: '' })

  //ALTERAÇÃO 2: estados saving e error
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  function onChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(e){
    e.preventDefault()
    setError('')

    //ALTERAÇÃO 3: validar campos
    if(!form.email) return setError('Preencha o email')

    if(!form.nome) return setError('Preencha o nome')

    if(form.data_nas && !/^\d{4}-\d{2}-\d{2}$/.test(form.data_nas)){
      return setError('Data de nascimento inválida')
    }

    console.log(form)

    //ALTERAÇÃO 4: payload no formato esperado pela API
    const payload = {
      nome: form.nome,
      email: form.email,
      data_nas: form.data_nas ? `${form.data_nas}T00:00:00.000Z`: null
    }

    //ALTERAÇÃO 5: chamada do serviço para salvar
    try{
      setSaving(true)
      alunoService.adicionarAluno(payload)

      //mensagem de sucesso
      alert('Aluno adicionado com sucesso!')

      //voltar para a listagem
      navigate(-1)
    }
    catch(error){
      setError(error.message)
    }
    finally{
      setSaving(false)
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Novo Aluno</h5>
        {/*ALTERAÇÃO: feedback de erro*/}
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome</label>
            <input name="nome" value={form.nome} onChange={onChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input name="email" type="email" value={form.email} onChange={onChange} className="form-control" required/>
          </div>
          <div className="col-md-4">
            <label className="form-label">Data de Nascimento</label>
            <input name="data_nas" type="date" value={form.data_nas} onChange={onChange} className="form-control" />
          </div>
          <div className="col-12 d-flex gap-2">
            {/*ALTERAÇÃO 6: botaão de salvar */}
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
