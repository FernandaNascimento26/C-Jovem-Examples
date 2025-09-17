// NOVO: tela de login para autenticar (recebe token e user)
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import authService from '../../services/authService' // NOVO
import { useAuth } from '../../context/AuthContext'            // NOVO (guarda sessão)

export default function Login(){
  const navigate = useNavigate()
  const { login: setSession } = useAuth()                  // NOVO: guarda {token, user}

  // NOVO: estados do form
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

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

  // NOVO: submit → chama /auth/login
  async function onSubmit(e){
    e.preventDefault()
    setError('')

    if(!form.email || !form.password)
      return setError('Informe email e senha.')

    try{
      setSaving(true)
      const data = await authService.login(form.email.trim(), form.password)
      // data = { token, user: { id, regra, aluno_id, email } }
      setSession(data) // NOVO: persiste sessão no contexto/localStorage

      // NOVO: redireciona conforme regra
      if(data.user.role === 'ALUNO' && data.user.aluno_id){
        navigate(`/aluno/${data.user.aluno_id}/treinos`)
      } else {
        navigate('/alunos')
      }
    }catch(err){
      setError(getErr(err, 'Falha no login.'))
    }finally{
      setSaving(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <h3 className="mt-4 mb-3">Entrar</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form className="vstack gap-3" onSubmit={onSubmit}>
        <input
          className="form-control"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={onChange}
        />
        <input
          className="form-control"
          name="password"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={onChange}
        />
        <button className="btn btn-primary" disabled={saving} type="submit">
          {saving ? 'Entrando...' : 'Entrar'}
        </button>

        {/* OPCIONAL: link para registrar aluno (se for permitir) */}
        <div className="text-end">
          <Link to="/registrar" className="small">Registrar aluno</Link>
        </div>
      </form>
    </div>
  )
}
