const express = require("express");
const { cadastrarUsuario } = require("../controllers/usuarioController");

const router = express.Router();

router.post('/cadastro', cadastrarUsuario);

module.exports = router;