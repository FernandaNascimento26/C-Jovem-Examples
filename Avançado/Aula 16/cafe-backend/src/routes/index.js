const express = require('express');
const menuRoutes = require('./menu.routes');
const orderRoutes = require('./order.routes');
const contactRoutes = require('./contact.routes');

const router = express.Router();

// Rotas para o menu
router.use(menuRoutes);
router.use(orderRoutes);
router.use(contactRoutes);

module.exports = router;
