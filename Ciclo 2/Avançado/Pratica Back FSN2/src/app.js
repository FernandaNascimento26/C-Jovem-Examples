const express = require('express');

const app = express();

app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');

app.get('/', (req, res) => {
    res.send('API de Alunos');
});

app.use('/api/aluno', alunoRoutes);

module.exports = app;