const express = require('express');
const cors = require('cors'); // Importe o cors
const app = express();
const todoRoutes = require('./routes/todoRoutes');

// Configura o CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:5174', // Permite apenas o frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true, // Permite cookies e headers de autenticação
}));

app.use(express.json());
app.use('/todos', todoRoutes);

module.exports = app;