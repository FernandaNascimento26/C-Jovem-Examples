const express = require('express');
const router = express.Router();
const {getAllTreinosByAluno,getTreinoByIdHandler,addTreinoHandler,updateTreinoHandler,deleteTreinoHandler} = require('../controllers/treinoController');

router.get('/aluno/:id_aluno/treinos', getAllTreinosByAluno);
router.get('/treino/:id_treino', getTreinoByIdHandler);
router.post('/treino', addTreinoHandler);
router.put('/treino/:id_treino', updateTreinoHandler);
router.delete('/treino/:id_treino', deleteTreinoHandler);

module.exports = router;
