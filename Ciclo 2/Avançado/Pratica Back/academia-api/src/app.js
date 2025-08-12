const express = require('express');
const app = express();


app.use(express.json());

const alunoRoutes = require('./routes/alunoRoutes');

app.get('/', (req, res) => {
    res.send('API Academia');
});

app.use('/api/alunos', alunoRoutes);



module.exports = app;