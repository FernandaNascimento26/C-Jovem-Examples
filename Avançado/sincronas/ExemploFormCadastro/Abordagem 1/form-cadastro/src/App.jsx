import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroUsuario from './pages/CadastroUsuario';
import CompletarPaciente from './pages/CadastroPaciente';
import CompletarProfissional from './pages/CadastroProfissional';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Rota de Cadastro Inicial */}
        <Route path="/cadastro" element={<CadastroUsuario />} />
        
        {/* Rotas de Complemento de Cadastro */}
        <Route path="/completar-paciente/:id" element={<CompletarPaciente />} />
        <Route path="/completar-profissional/:id" element={<CompletarProfissional />} />
        
        {/* Rota Principal após Login */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Rota Padrão */}
        <Route path="/" element={<CadastroUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;