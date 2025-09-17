const express = require('express');
const router = express.Router();

const {login, registerAluno } = require('../controllers/authController');

router.post('/login', login);
router.post('/register-aluno', registerAluno);


module.exports = router;
