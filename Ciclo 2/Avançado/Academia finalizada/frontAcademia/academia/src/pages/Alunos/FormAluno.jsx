import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom' // NOVO (useParams) 

// ALTERADO: antes era só form ilustrativo; agora chama API para criar/editar
import alunoService from '../../services/alunoService' // NOVO

// NOVO: helper simples para converter ISO/Date para YYYY-MM-DD do <input type="date">
function toDateInput(value) {
  if (!value) return ''
  const d = new Date(value)
  if (isNaN(d.getTime())) return ''
  // usamos UTC para evitar “voltar 1 dia” por timezone
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function FormAluno(){
  const navigate = useNavigate()

  const { id } = useParams()                 // NOVO: se existir, estamos editando
  const editing = Boolean(id)                // NOVO

  const [form, setForm] = useState({ nome: '', email: '', data_nascimento: '' })
  const [error, setError] = useState('')         // NOVO
  const [saving, setSaving] = useState(false)    // NOVO
  const [loading, setLoading] = useState(editing) // NOVO: loading ao carregar aluno

  function onChange(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // NOVO: quando for edição, buscar dados do aluno e preencher o form
  useEffect(() => {
    if (!editing) return
    (async () => {
      try {
        setLoading(true)
        const aluno = await alunoService.buscarDadosAluno(id)
        setForm({
          nome: aluno?.nome || '',
          email: aluno?.email || '',
          // ALTERADO: agora normaliza para YYYY-MM-DD (DATE puro no back)
          data_nascimento: toDateInput(aluno?.data_nascimento),
        })
      } catch (err) {
        const msg = err?.response?.data?.error || 'Falha ao carregar aluno.'
        setError(msg)
      } finally {
        setLoading(false)
      }
    })()
  }, [id, editing])

  // ALTERADO: submit agora valida e envia para API no formato DATE ("YYYY-MM-DD")
  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    // validações básicas (alinhadas ao backend)
    if (!form.nome || form.nome.trim().length === 0)
      return setError('Nome é obrigatório.')
    if (!form.email || form.email.trim().length === 0)
      return setError('Email é obrigatório.')
    if (!form.data_nascimento || !/^\d{4}-\d{2}-\d{2}$/.test(form.data_nascimento))
      return setError('Data de nascimento é obrigatória (formato YYYY-MM-DD).')

    // ALTERADO: enviar APENAS "YYYY-MM-DD" (sem 'T00:00:00Z'), pois coluna é @db.Date
    const payload = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      data_nascimento: form.data_nascimento, // <-- DATE puro
    }

    try {
      setSaving(true)
      if (editing) {
        // ALTERADO: atualizar
        await alunoService.atualizarAluno(id, payload)
      } else {
        // ALTERADO: criar
        await alunoService.adicionarAluno(payload)
      }
      navigate('/alunos')
    } catch (err) {
      const msg = err?.response?.data?.error || err?.response?.data?.message || 'Erro ao salvar.'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* ALTERADO: título dinâmico conforme criação/edição */}
        <h5 className="mb-3">{editing ? `Editar Aluno #${id}` : 'Novo Aluno'}</h5>

        {/* NOVO: exibe erro de validação/servidor */}
        {error && <div className="alert alert-danger">{error}</div>}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nome *</label> {/* ALTERADO: obrigatório */}
              <input
                name="nome"
                value={form.nome}
                onChange={onChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="form-control"
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Data de Nascimento *</label> {/* ALTERADO: obrigatório */}
              <input
                name="data_nascimento"
                type="date"
                value={form.data_nascimento}
                onChange={onChange}
                className="form-control"
                required
              />
              <div className="form-text">
                Formato aceito: <code>YYYY-MM-DD</code>. (Será salvo como <strong>DATE</strong> no banco)
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              {/* ALTERADO: botão agora envia; estado de saving */}
              <button className="btn btn-primary" disabled={saving} type="submit">
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
