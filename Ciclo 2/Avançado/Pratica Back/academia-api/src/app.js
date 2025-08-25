const express = require('express');
const app = express();
const alunoRoutes = require('./routes/alunoRoutes');
const treinoRoutes = require('./routes/treinoRoutes');


app.use(express.json());


app.get('/', (req, res) => {
    res.send('API Academia');
});

app.use('/api/alunos', alunoRoutes);
app.use('/api',treinoRoutes);



module.exports = app;