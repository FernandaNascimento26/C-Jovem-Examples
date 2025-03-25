import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EscolherTipo from './pages/Cadastro';
import CadastroPaciente from './pages/CadastroPaciente'
import CadastroProfissional from './pages/CadastroProfissional';
import './App.css'


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/cadastro" element={<EscolherTipo />} />
      <Route path="/cadastro/paciente" element={<CadastroPaciente />} />
      <Route path="/cadastro/profissional" element={<CadastroProfissional />} />
    </Routes>
  </Router>
  )
}

export default App
