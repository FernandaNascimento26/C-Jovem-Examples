const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');
const treinoRoutes = require('./routes/treinoRoutes');

app.get('/', (req, res) => {
    res.send('API ok!!');
});

app.use('/api/alunos', alunoRoutes);
app.use(treinoRoutes);

module.exports = app;