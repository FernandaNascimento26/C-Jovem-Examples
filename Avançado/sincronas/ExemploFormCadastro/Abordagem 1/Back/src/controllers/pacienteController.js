const { updatePaciente } = require('../models/pacienteModel');

const completarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPaciente = await updatePaciente(id, req.body);
    res.json(updatedPaciente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { completarPaciente };