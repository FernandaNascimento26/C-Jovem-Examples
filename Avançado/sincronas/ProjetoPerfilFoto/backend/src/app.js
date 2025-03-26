
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/api', router);

module.exports = app;
