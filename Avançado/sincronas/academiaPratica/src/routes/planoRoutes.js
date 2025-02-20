// src/routes/planoRoutes.js
const express = require('express');
const planoController = require('../controllers/planoController');

const router = express.Router();

router.get('/', planoController.listarPlanos);
router.get('/:id', planoController.buscarPlanoPorId);
router.post('/', planoController.criarPlano);
router.put('/:id', planoController.atualizarPlano);
router.delete('/:id', planoController.excluirPlano);

module.exports = router;