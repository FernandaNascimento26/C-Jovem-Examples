const express = require('express');
const alunoRoutes = require('./routes/alunoRoutes');
const planoRoutes = require('./routes/planoRoutes');

const app = express();

app.use(express.json());
app.use('/alunos', alunoRoutes);
app.use('/planos', planoRoutes);

module.exports = app;