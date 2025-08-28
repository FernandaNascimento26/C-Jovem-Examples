import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FormAluno(){
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', data_nascimento: '' })

  function onChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onSubmit(e){
    e.preventDefault()
    alert('Fase 0: formulário ilustrativo. O envio será habilitado na Fase 1.')
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Novo Aluno</h5>
        <div className="alert alert-info">Modo demonstração: ainda sem salvamento.</div>
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
            <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={onChange} className="form-control" />
          </div>
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-primary" disabled>Salvar (em breve)</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
