const express = require('express');
const app = express();

// Simulando uma lista de livros
const livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
  { id: 2, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling' }
];

// Middleware para registrar logs
app.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();  // Continua para a próxima função (pode ser outro middleware ou a rota)
});

// Middleware para verificar autenticação (exemplo fictício)
const verificarAutenticacao = (req, res, next) => {
  const usuarioAutenticado = true;  // Simulando um usuário autenticado
  if (usuarioAutenticado) {
    next();  // Continua para a rota de adicionar livro
  } else {
    res.status(401).send('Acesso negado. Faça login para continuar.');
  }
};

// Rota para listar todos os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});

// Rota para adicionar um livro (apenas usuários autenticados)
app.post('/livros', verificarAutenticacao, (req, res) => {
  const novoLivro = { id: 3, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien' };
  livros.push(novoLivro);
  res.status(201).send('Livro adicionado com sucesso');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
