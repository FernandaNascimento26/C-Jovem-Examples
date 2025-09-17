const express = require('express');
const router = express.Router();
const { getAllAlunosHandler,getAlunoByIdHandler,addAlunoHandler,updateAlunoHandler,deleteAlunoHandler} = require('../controllers/alunoController');
const { requireAuth, requireRoles, requireSelfAlunoOrRoles } = require('../middlewares/auth');

router.get('/', requireAuth,getAllAlunosHandler);
router.get('/:id_aluno', requireAuth,requireSelfAlunoOrRoles,getAlunoByIdHandler);
router.post('/', addAlunoHandler);
router.put('/:id_aluno', updateAlunoHandler);
router.delete('/:id_aluno', deleteAlunoHandler);

module.exports = router;
