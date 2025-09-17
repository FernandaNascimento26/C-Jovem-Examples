import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import { RequireAuth, RequireRoles, RequireAlunoSelfOrRoles } from './routes/guards';

/*
import ListAlunos from '../pages/Alunos/ListAlunos'
import FormAluno from './pages/Alunos/FormAluno'
import ListTreinos from './pages/Treinos/ListTreinos'
import FormTreino from './pages/Treinos/FormTreino'
*/

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Unauthorized from './pages/Unauthorized'
import NotFound from './pages/NotFound'


// NOVO: rotas para testar auth
import Login from './pages/Alunos/Login'
import RegisterAluno from './pages/Alunos/Register'


// Alunos
import AlunosList from './pages/Alunos/ListAlunos';           // ADMIN/PROFESSOR
import AlunoPerfil from './pages/Alunos/AlunoPerfil';          // ALUNO (self) ou ADMIN/PROFESSOR
import AlunoPerfilEdit from './pages/Alunos/AlunoPerfilEdit';  // ALUNO (self)

// Treinos
import TreinosList from './pages/Treinos/TreinosList';            // ADMIN/PROFESSOR
import TreinoCreate from './pages/Treinos/TreinoCreate';          // ADMIN/PROFESSOR
import TreinoEdit from './pages/Treinos/TreinoEdit';              // ADMIN/PROFESSOR
import MeusTreinos from './pages/Treinos/MeusTreinos';            // ALUNO self (/aluno/:id/treinos)


export default function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<RegisterAluno />} />

          {/* Alunos */}
          <Route
            path="/alunos"
            element={
              <RequireAuth>
                <RequireRoles roles={['ADMIN','PROFESSOR']}>
                  <AlunosList />
                </RequireRoles>
              </RequireAuth>
            }
          />
          {/* perfil do aluno (self ou roles elevadas) */}
          <Route
            path="/me"
            element={
              <RequireAuth>
                {/* aluno vê o próprio perfil (usa user.aluno_id dentro da página) */}
                <AlunoPerfil self />
              </RequireAuth>
            }
          />
          <Route
            path="/me/editar"
            element={
              <RequireAuth>
                <AlunoPerfilEdit />
              </RequireAuth>
            }
          />

          {/* Treinos */}
          <Route
            path="/treinos"
            element={
              <RequireAuth>
                <RequireRoles roles={['ADMIN','PROFESSOR']}>
                  <TreinosList />
                </RequireRoles>
              </RequireAuth>
            }
          />
          <Route
            path="/treinos/novo"
            element={
              <RequireAuth>
                <RequireRoles roles={['ADMIN','PROFESSOR']}>
                  <TreinoCreate />
                </RequireRoles>
              </RequireAuth>
            }
          />
          <Route
            path="/treinos/:id/editar"
            element={
              <RequireAuth>
                <RequireRoles roles={['ADMIN','PROFESSOR']}>
                  <TreinoEdit />
                </RequireRoles>
              </RequireAuth>
            }
          />

          {/* Meus treinos: aluno self OU ADMIN/PROFESSOR */}
          <Route
            path="/aluno/:id/treinos"
            element={
              <RequireAuth>
                <RequireAlunoSelfOrRoles roles={['ADMIN','PROFESSOR']}>
                  <MeusTreinos />
                </RequireAlunoSelfOrRoles>
              </RequireAuth>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}