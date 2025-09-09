// Rotas de autenticação: login e registro de aluno

const express = require('express');
const router = express.Router();

// Importa os handlers do controller
const { login, registerAluno } = require('../controllers/authController');

// =======================================
// POST /auth/login
// - Faz login com email + senha
// - Retorna token JWT e dados do usuário
// =======================================
router.post('/login', login);

// =======================================
// POST /auth/register-aluno
// - Cria um aluno e um usuário vinculado (role ALUNO)
// - Requer: { nome, data_nascimento, email, password }
// - Retorna aluno + user
// =======================================
router.post('/register-aluno', registerAluno);

module.exports = router;
