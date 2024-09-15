const express = require('express');
const livroRoutes = require('./routes/livroRoutes');
const app = express();

app.use(express.json()); // Para que o Express lide com JSON

// Usando as rotas dos livros
app.use('/livros', livroRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
