const express = require('express');
const { completarPaciente } = require('../controllers/pacienteController');
const router = express.Router();

router.put('/:id', completarPaciente);

module.exports = router;