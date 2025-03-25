
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuario from './pages/Usuario';
import EscolhaTipo from './pages/EscolhaTipo';
import Paciente from './pages/Paciente';
import Profissional from './pages/Profissional';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cadastro-multi" element={<Usuario />} />
        <Route path="/cadastro-multi/escolha" element={<EscolhaTipo />} />
        <Route path="/cadastro-multi/paciente" element={<Paciente />} />
        <Route path="/cadastro-multi/profissional" element={<Profissional />} />
        <Route path="/login" element={<div>Login em breve...</div>} />
      </Routes>
    </Router>
  );
}

export default App;