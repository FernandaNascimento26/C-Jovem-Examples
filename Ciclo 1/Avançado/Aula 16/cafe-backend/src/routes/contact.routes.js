const express = require('express');
const { sendContactMessage,getAllContacts } = require('../controllers/contactController');

const router = express.Router();

router.post('/contact', sendContactMessage);

router.get('/contacts', getAllContacts);

module.exports = router;
