const express = require('express');
const cors = require("cors");

const usuarioRoutes = require('./routes/usuarioRoutes');


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/usuarios", usuarioRoutes);

module.exports = app;
