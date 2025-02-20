// src/routes/alunoRoutes.js
const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

// Rotas para alunos
router.get('/', alunoController.listarAlunos);
router.get('/:id', alunoController.buscarAlunoPorId);
router.post('/', alunoController.criarAluno);
router.put('/:id', alunoController.atualizarAluno);
router.delete('/:id', alunoController.excluirAluno);

module.exports = router;