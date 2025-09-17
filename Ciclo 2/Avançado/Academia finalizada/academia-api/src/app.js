const express = require('express');
const app = express();
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');
const treinoRoutes = require('./routes/treinoRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173', // Permite requisições do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
}));

app.get('/', (req, res) => {
    res.send('API Academia');
});

app.use('/api/alunos', alunoRoutes);
app.use('/api',treinoRoutes);
app.use('/api/auth', authRoutes);



module.exports = app;