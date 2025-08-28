import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListAlunos from './pages/Alunos/ListAlunos'
import FormAluno from './pages/Alunos/FormAluno'
import ListTreinos from './pages/Treinos/ListTreinos'
import FormTreino from './pages/Treinos/FormTreino'

export default function App(){
  return (
    <div className="bg-light min-vh-100">
      <Navbar/>
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate to="/alunos" replace/>} />

          {/* Alunos */}
          <Route path="/alunos" element={<ListAlunos/>} />
          <Route path="/alunos/novo" element={<FormAluno/>} />

          {/* Treinos */}
          <Route path="/alunos/:alunoId/treinos" element={<ListTreinos/>} />
          <Route path="/alunos/:alunoId/treinos/novo" element={<FormTreino/>} />
        </Routes>
      </div>
    </div>
  )
}
