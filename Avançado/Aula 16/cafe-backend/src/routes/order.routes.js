// src/routes/order.routes.js
const express = require('express');
const { createOrder, getAllOrders } = require('../controllers/orderController');

const router = express.Router();

// Rota para criar um novo pedido
router.post('/orders', createOrder);

// Rota para visualizar todos os pedidos
router.get('/orders', getAllOrders);

module.exports = router;
