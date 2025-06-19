const express = require('express');
const { criarUsuario } = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', criarUsuario);

module.exports = router;