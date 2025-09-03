import { useState, useEffect } from 'react' //edição import useEffect
import { useNavigate, useParams } from 'react-router-dom'

//Alteração import do serviço
import alunosService from '../../services/alunoService' // exemplo 1

export default function FormAluno() {
  const navigate = useNavigate()

  //edição: captura do id_aluno dos parâmetros da rota e definição da variável editing
  const { id_aluno } = useParams()
  const editing = Boolean(id_aluno)

  const [form, setForm] = useState({ nome: '', email: '', data_nascimento: '' })

  //alteração: estados de error e saving
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  //edição: adição do estado loading
  const [loading, setLoading] = useState(editing)


  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  //edição: adicionar useEffect para carregar os dados do aluno quando editing for true
  useEffect(() => {
    if (!editing) return
    (async () => {
      try {
        setLoading(true)
        const data = await alunosService.buscarDadosAluno(id_aluno) //exemplo 1
        setForm({
          nome: data.nome || '',
          email: data.email || '',
          data_nascimento: data?.data_nascimento ? new Date(data.data_nascimento).toISOString().substring(0, 10) : ''
        })
      } catch (error) {
        const msg = error?.response?.data?.message || 'Falha ao carregar dados do aluno.'
        setError(msg)
      }
      finally {
        setLoading(false)
      }
    })()

  }, [editing, id_aluno])

 
  function onSubmit(e) {
      e.preventDefault()
      setError('')

      //validações 
      if (!form.nome) return setError('Nome é obrigatório.')
      if (!form.email) return setError('Email é obrigatório.')
      if (form.data_nascimento && !/^\d{4}-\d{2}-\d{2}$/.test(form.data_nascimento)) {
        return setError('Data de Nascimento deve estar no formato AAAA-MM-DD.')
      }

      //payload
      const payload = {
        nome: (form.nome || '').trim(),
        email: (form.email || '').trim(),
        data_nascimento: form.data_nascimento ? `${form.data_nascimento}T00:00:00.000Z` : null
      }

      //saving

      try {
        setSaving(true)

        //edição: chamada do serviço diferente para inclusão e edição
        if (editing) {
          alunosService.atualizarAluno(id_aluno, payload) //exemplo 1
        }
        else{
        //chamada do serviço de inclusão
        alunosService.adicionarAluno(payload) //exemplo 1
        }

         navigate('/alunos')
      }
      catch (error) {
        const msg = error?.response?.data?.message || 'Falha ao salvar aluno.'
        setError(msg)
      }
      finally {
        setSaving(false)
      }

    }

    return (
      <div className="card shadow-sm">
        <div className="card-body">

          {/*verificar se é edição ou adição*/}
          <h5 className="mb-3">{editing?`Editar aluno ${id_aluno}`:`Novo Aluno`}</h5>
          {/*alteração: exibição de mensagens de error e saving*/}
          {error && <p className="alert alert-danger">{error}</p>}
          {/*edição: mensagem de loading*/}
          {loading? (<p>Carregando...</p>) :( 
          <form onSubmit={onSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nome</label>
              <input name="nome" value={form.nome} onChange={onChange} className="form-control" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email *</label>
              <input name="email" type="email" value={form.email} onChange={onChange} className="form-control" required />
            </div>
            <div className="col-md-4">
              <label className="form-label">Data de Nascimento</label>
              <input name="data_nascimento" type="date" value={form.data_nascimento} onChange={onChange} className="form-control" />
            </div>
            <div className="col-12 d-flex gap-2">
              {/*alteração: habilitar botão ao salvar*/}
              <button className="btn btn-primary" disabled={saving} type="submit">
                {saving ? 'Salvando...' : 'Salvar'}
              </button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancelar</button>
            </div>
          </form>
          )}
        </div>
      </div>
    )
  }
