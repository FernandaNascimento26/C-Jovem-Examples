import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function FormTreino(){
  const navigate = useNavigate()
  const { alunoId } = useParams()
  const [form, setForm] = useState({ descricao: '', data_inicio: '' })

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
        <h5 className="mb-3">Novo Treino para Aluno #{alunoId}</h5>
        <div className="alert alert-info">Modo demonstração: ainda sem salvamento.</div>
        <form onSubmit={onSubmit} className="row g-3">
          <div className="col-md-8">
            <label className="form-label">Descrição *</label>
            <input name="descricao" value={form.descricao} onChange={onChange} className="form-control" required/>
          </div>
          <div className="col-md-4">
            <label className="form-label">Data de Início</label>
            <input type="date" name="data_inicio" value={form.data_inicio} onChange={onChange} className="form-control" />
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
