import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { isAuth, user } = useAuth()
  const role = user?.role

  return (
    <div className="container py-4">
      <h2 className="mb-3">🏋️‍♀️ Academia — Home</h2>
      <p className="text-muted">
        Esta aplicação gerencia <strong>Alunos</strong> e seus <strong>Treinos</strong>, com autenticação e autorização por papéis: <code>ALUNO</code>, <code>PROFESSOR</code> e <code>ADMIN</code>.
      </p>

      {/* Acesso rápido conforme papel */}
      <div className="row g-3 mt-1">
        {(!isAuth) && (
          <div className="col-12">
            <div className="alert alert-info">
              Você ainda não está autenticado. <Link to="/login">Entrar</Link> ou <Link to="/registrar">Registrar aluno</Link>.
            </div>
          </div>
        )}

        {isAuth && role === 'ALUNO' && (
          <div className="col-12">
            <div className="alert alert-success">
              Olá, aluno! Você pode visualizar seus dados e seus treinos.
              {user?.aluno_id && (
                <> Ir para seus <Link to={`/aluno/${user.aluno_id}/treinos`}>Treinos</Link>.</>
              )}
            </div>
          </div>
        )}

        {isAuth && role === 'PROFESSOR' && (
          <div className="col-12">
            <div className="alert alert-warning">
              Olá, professor! Você pode gerenciar alunos e treinos de toda a academia.
              Vá para <Link to="/alunos">Alunos</Link>.
            </div>
          </div>
        )}

        {isAuth && role === 'ADMIN' && (
          <div className="col-12">
            <div className="alert alert-dark">
              Olá, admin! Você tem acesso total (inclui edição de alunos).
              Vá para <Link to="/alunos">Alunos</Link>.
            </div>
          </div>
        )}
      </div>

      {/* Lógica da aplicação */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title">Como funciona</h5>
          <ul className="mb-0">
            <li>Login com <strong>email</strong> e <strong>senha</strong> (tabela <code>user</code>). O <code>user</code> pode estar ligado a um <code>aluno</code>.</li>
            <li>Um <code>aluno</code> possui zero ou mais <code>treinos</code>.</li>
            <li>As permissões de acesso são definidas pelo campo <code>role</code> do usuário autenticado.</li>
          </ul>
        </div>
      </div>

      {/* Regras por papel */}
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="card-title">Regras de negócio por papel</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th style={{width: '140px'}}>Papel</th>
                  <th>Alunos</th>
                  <th>Treinos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ALUNO</code></td>
                  <td>
                    <ul className="mb-0">
                      <li>Ver <u>apenas seus próprios</u> dados</li>
                      <li>Editar seus dados</li>
                      <li><span className="text-danger">Não</span> pode excluir</li>
                    </ul>
                  </td>
                  <td>
                    <ul className="mb-0">
                      <li>Ver <u>apenas seus próprios</u> treinos</li>
                      <li><span className="text-danger">Não</span> pode criar/editar/excluir</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td><code>PROFESSOR</code></td>
                  <td>
                    <ul className="mb-0">
                      <li>Ver todos os alunos</li>
                      <li><span className="text-danger">Não</span> edita dados do aluno</li>
                      <li>Pode <strong>adicionar</strong> e <strong>excluir</strong> aluno</li>
                    </ul>
                  </td>
                  <td>
                    <ul className="mb-0">
                      <li>CRUD completo de treinos (todos os alunos)</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td><code>ADMIN</code></td>
                  <td>
                    <ul className="mb-0">
                      <li>Acesso total, incluindo <strong>editar</strong> dados do aluno</li>
                    </ul>
                  </td>
                  <td>
                    <ul className="mb-0">
                      <li>CRUD completo de treinos (todos os alunos)</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <small className="text-muted">
            As regras também são validadas no backend (middlewares de autenticação/autorização).  
          </small>
        </div>
      </div>

      {/* Atalhos por papel */}
      <div className="row g-3 mt-3">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h6>Páginas principais</h6>
              <ul className="mb-0">
                <li><Link to="/login">Login</Link> · <Link to="/registrar">Registrar aluno</Link></li>
                <li><Link to="/alunos">Lista de Alunos</Link> (prof/admin)</li>
                <li><em>Meus Treinos</em> (aluno): {user?.aluno_id ? <Link to={`/aluno/${user.aluno_id}/treinos`}>/aluno/{user.aluno_id}/treinos</Link> : '—'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h6>Regras técnicas (resumo)</h6>
              <ul className="mb-0">
                <li>Emails e senhas ficam na tabela <code>user</code>; aluno não tem email.</li>
                <li>Relação 1–1: <code>user.aluno_id → aluno.id_aluno</code>.</li>
                <li>Deleção de aluno remove treinos por cascade; user é removido explicitamente.</li>
                <li>Datas:
                  <ul className="mb-0">
                    <li><code>aluno.data_nascimento</code> = DATE (YYYY-MM-DD)</li>
                    <li><code>treino.data_inicio</code> = DateTime (default agora)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="d-flex gap-2 mt-4">
        {!isAuth && <Link className="btn btn-primary" to="/login">Fazer Login</Link>}
        {!isAuth && <Link className="btn btn-outline-secondary" to="/registrar">Registrar Aluno</Link>}
        {isAuth && role === 'ALUNO' && user?.aluno_id && (
          <Link className="btn btn-primary" to={`/aluno/${user.aluno_id}/treinos`}>Ver Meus Treinos</Link>
        )}
        {isAuth && (role === 'PROFESSOR' || role === 'ADMIN') && (
          <Link className="btn btn-primary" to="/alunos">Gerenciar Alunos</Link>
        )}
      </div>
    </div>
  )
}
