// NOVO: tela de registro de ALUNO (cria aluno + user)
// Usa /auth/register-aluno (nome, data_nascimento, email, password)
import { useState } from 'react'
import authService from '../../services/authService' // NOVO
import { Link } from 'react-router-dom'

export default function RegisterAluno(){
  // NOVO: estados do form
  const [form, setForm] = useState({
    nome: '',
    data_nascimento: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  function onChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function getErr(error, fallback){
    const data = error?.response?.data
    return (
      (typeof data === 'string' && data) ||
      data?.error || data?.message ||
      error?.message || fallback
    )
  }

  // NOVO: submit → chama /auth/register-aluno
  async function onSubmit(e){
    e.preventDefault()
    setError('')
    setSuccess('')

    // validações básicas
    if(!form.nome) return setError('Nome é obrigatório.')
    if(!form.email) return setError('Email é obrigatório.')
    if(!form.data_nascimento || !/^\d{4}-\d{2}-\d{2}$/.test(form.data_nascimento))
      return setError('Data de nascimento inválida (YYYY-MM-DD).')
    if(!form.password || form.password.length < 6)
      return setError('Senha deve ter pelo menos 6 caracteres.')

    try{
      setSaving(true)
      await authService.registerAluno({
        nome: form.nome.trim(),
        email: form.email.trim(),
        data_nascimento: form.data_nascimento, // DATE puro (back espera @db.Date)
        password: form.password,
      })

      // NOVO: feedback de sucesso
      setSuccess('Aluno registrado com sucesso! Agora você já pode fazer login.')

      // NOVO: limpar TODO o formulário após sucesso
      setForm(f => ({ ...f, password: '', data_nascimento: '', nome: '' }))
    }catch(err){
      setError(getErr(err, 'Falha ao registrar aluno.'))
    }finally{
      setSaving(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <h3 className="mt-4 mb-3">Registrar Aluno</h3>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-6">
          <label className="form-label">Nome *</label>
          <input
            className="form-control"
            name="nome"
            value={form.nome}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input
            className="form-control"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Data de Nascimento *</label>
          <input
            className="form-control"
            name="data_nascimento"
            type="date"
            value={form.data_nascimento}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Senha *</label>
          <input
            className="form-control"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            minLength={6}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" disabled={saving} type="submit">
            {saving ? 'Registrando...' : 'Registrar'}
          </button>
          <Link to="/login" className="btn btn-outline-secondary">Ir para Login</Link>
        </div>
      </form>
    </div>
  )
}
