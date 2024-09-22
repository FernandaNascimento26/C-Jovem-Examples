const express = require('express');
const app = express();

// Simulando uma lista de livros em memória
const livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
  { id: 2, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' }
];

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Rota para buscar um livro pelo ID
app.get('/livros/:id', (req, res) => {
  const livroId = Number(req.params.id);
  const livro = livros.find(l => l.id === livroId);
  if (livro) {
    res.json(livro);
  } else {
    res.status(404).send('Livro não encontrado');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
