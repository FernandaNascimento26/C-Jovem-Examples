const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Rota para listar todos os livros
router.get('/', livroController.getLivros);

router.get('/:id', livroController.getLivroById);

// Rota para adicionar um novo livro
router.post('/', livroController.createLivro);

// Rota para atualizar um livro existente
router.put('/:id', livroController.updateLivro);

// Rota para excluir um livro
router.delete('/:id', livroController.deleteLivro);

module.exports = router;
