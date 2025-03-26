
const express = require('express');
const authController = require('../controllers/authController');
const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/perfil', authMiddleware, perfilController.criarPerfil);
router.get('/perfil', authMiddleware, perfilController.getPerfil);

module.exports = router;
