const { updateProfissional } = require('../models/profissionalModel');

const completarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfissional = await updateProfissional(id, req.body);
    res.json(updatedProfissional);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { completarProfissional };