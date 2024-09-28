const express = require('express');
const router = express.Router();
const { getAllMenuItems, addMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

// Rota para obter todos os itens do menu
router.get('/menu', getAllMenuItems);

// Rota para adicionar itens ao menu
router.post('/menu', addMenuItems);

// Rota para atualizar um item do menu
router.put('/menu/:id', updateMenuItem);

// Rota para remover um item do menu
router.delete('/menu/:id', deleteMenuItem);

module.exports = router;
