const express = require('express');

const app = express();

app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');
const treinoRoutes = require('./routes/treinoRoutes');

app.get('/', (req, res) => {
    res.send('API ok!!');
});

app.use('/api/alunos', alunoRoutes);
app.use(treinoRoutes);

module.exports = app;