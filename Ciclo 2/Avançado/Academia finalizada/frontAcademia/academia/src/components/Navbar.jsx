// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout, hasRole } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Academia</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ALUNOS: Admin e Professor podem ver a lista de alunos */}
            {(hasRole('ADMIN','PROFESSOR')) && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/alunos">Alunos</NavLink>
              </li>
            )}

            {/* TREINOS:
                - Admin/Professor: podem gerenciar treinos geral (/treinos)
                - Aluno: só vê os próprios treinos (/aluno/:id/treinos) */}
            {hasRole('ADMIN','PROFESSOR') && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/treinos">Treinos</NavLink>
              </li>
            )}
            {user?.role === 'ALUNO' && user?.aluno_id && (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/aluno/${user.aluno_id}/treinos`}>Meus Treinos</NavLink>
              </li>
            )}

            {/* Perfil do aluno (ver/editar) */}
            {user?.role === 'ALUNO' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/me">Meu Perfil</NavLink>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="navbar-text me-2 small">
                    {user?.email} ({user?.role})
                  </span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
