const express = require('express');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API Academia funcionando!');  

});

<<<<<<< HEAD
app.use('api/aluno', alunoRoutes);
=======
app.use((req, res, next) => {
  res.removeHeader('Content-Security-Policy');
  next();
});

app.use('/api/aluno', alunoRoutes);
>>>>>>> 52a675079b81d165c5c3ce01922a5293f81a4160


module.exports = app;