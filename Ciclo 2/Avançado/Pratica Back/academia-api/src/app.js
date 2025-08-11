const express = require('express');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API Academia funcionando!');  

});

app.use('api/aluno', alunoRoutes);


module.exports = app;