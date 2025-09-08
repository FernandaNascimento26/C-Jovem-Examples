const express = require('express');
const router = express.Router();

const {
  getAllAlunosHandler,
  getAlunoByIdHandler,
  addAlunoHandler,
  updateAlunoHandler,
  deleteAlunoHandler,
  getAlunoTreinosCountHandler, // importa o handler novo
} = require('../controllers/alunoController');

// Lista todos
router.get('/', getAllAlunosHandler);

// Busca único aluno
router.get('/:id_aluno', getAlunoByIdHandler);

// Preview: quantos treinos o aluno tem
router.get('/:id_aluno/treinos/count', getAlunoTreinosCountHandler);

// Cria
router.post('/', addAlunoHandler);

// Atualiza
router.put('/:id_aluno', updateAlunoHandler);

// Deleta (cascade treinos)
router.delete('/:id_aluno', deleteAlunoHandler);

module.exports = router;
