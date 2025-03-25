import express from 'express';
import { criarUsuarioCompleto } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/completo', criarUsuarioCompleto);

export default router;