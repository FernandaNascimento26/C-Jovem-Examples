import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Componente principal
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Renderiza a Home */}
          {/* Se você adicionar outras páginas como "Detalhes", você pode adicionar mais rotas aqui */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
