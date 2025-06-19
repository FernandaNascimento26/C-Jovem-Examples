import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  // Estado global de livros, compartilhado entre Home e AddEdit
  const [livros, setLivros] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home livros={livros} setLivros={setLivros} />} />
      </Routes>
    </Router>
  );
};

export default App;
