import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// ALTERADO: antes só criava; agora também edita
import treinoService from '../../services/treinoService'

function dateToInput(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function FormTreino() {
  const navigate = useNavigate()
  const { alunoId, treinoId } = useParams() // NOVO: pega também o treinoId
  const editing = Boolean(treinoId)         // NOVO: define se é edição

  // NOVO: estado inicia vazio
  const [form, setForm] = useState({ descricao: '', data_inicio: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false) // NOVO: para exibir "Carregando..."

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function apiErrorMessage(err) {
    if (err?.response) {
      const { status, data } = err.response
      const msg = data?.error || data?.message || JSON.stringify(data)
      return `(${status}) ${msg}`
    }
    return err?.message || 'Erro desconhecido'
  }

  // NOVO: quando for edição, carrega o treino no useEffect
  useEffect(() => {
    if (!editing) return
    ;(async () => {
      try {
        setLoading(true)
        const data = await treinoService.buscarTreino(treinoId)
        setForm({
          descricao: data?.descricao || '',
          data_inicio: dateToInput(data?.data_inicio) || '',
        })
      } catch (err) {
        setError(apiErrorMessage(err))
      } finally {
        setLoading(false)
      }
    })()
  }, [editing, treinoId])

  // ALTERADO: submit agora cria OU edita
  async function onSubmit(e) {
    e.preventDefault()
    setError('')

    // validações básicas
    if (!form.descricao || form.descricao.trim().length < 20)
      return setError('Descrição é obrigatória (mín. 20 caracteres).')
    if (form.data_inicio && !/^\d{4}-\d{2}-\d{2}$/.test(form.data_inicio))
      return setError('Data inválida (YYYY-MM-DD).')

    // payload: se data_inicio vazio, não envia
    const payloadBase = { descricao: form.descricao.trim() }
    const payload =
      form.data_inicio
        ? { ...payloadBase, data_inicio: `${form.data_inicio}T00:00:00.000Z` }
        : { ...payloadBase }

    try {
      setSaving(true)
      if (editing) {
        await treinoService.atualizarTreino(treinoId, payload) // NOVO: update
      } else {
        await treinoService.adicionarTreino(alunoId, payload)  // já existia
      }
      navigate(`/alunos/${alunoId}/treinos`)
    } catch (err) {
      setError(apiErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* ALTERADO: título muda conforme create/edit */}
        <h5 className="mb-3">
          {editing
            ? `Editar Treino #${treinoId} (Aluno #${alunoId})`
            : `Novo Treino para Aluno #${alunoId}`}
        </h5>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Descrição *</label>
              {/* ALTERADO: textarea para facilitar edição longa */}
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={onChange}
                className="form-control"
                rows={4}
                required
              />
              <div className="form-text">
                Descreva o treino com detalhes (mín. 20 caracteres).
              </div>
            </div>

            <div className="col-md-4">
              <label className="form-label">Data de Início</label>
              <input
                type="date"
                name="data_inicio"
                value={form.data_inicio}
                onChange={onChange}
                className="form-control"
              />
              <div className="form-text">
                {editing
                  ? 'Se vazio: mantém a data atual do treino.'
                  : 'Se vazio: usa a data/hora do cadastro.'}
              </div>
            </div>

            <div className="col-12 d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving
                  ? editing
                    ? 'Atualizando...'
                    : 'Salvando...'
                  : editing
                    ? 'Atualizar'
                    : 'Salvar'}
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
