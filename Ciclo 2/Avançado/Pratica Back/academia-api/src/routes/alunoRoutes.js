const express = require('express');
const router = express.Router();
const {getAllAlunosHandler,getAlunoByIdHandler,addAlunoHandler,updateAlunoHandler,deleteAlunoHandler} = require('../controller/alunoController');

router.get('/', getAllAlunosHandler);
router.get('/:id_aluno', getAlunoByIdHandler);
router.post('/', addAlunoHandler);
router.put('/:id_aluno', updateAlunoHandler);
router.delete('/:id_aluno', deleteAlunoHandler);

module.exports = router;