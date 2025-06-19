const express = require('express');
const { completarProfissional } = require('../controllers/profissionalController');
const router = express.Router();

router.put('/:id', completarProfissional);

module.exports = router;