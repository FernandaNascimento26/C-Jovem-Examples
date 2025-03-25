const { createUsuarioComPerfil } = require('../models/usuarioModel');

const cadastrarUsuario = async (req, res) => {
  try {
    const usuario = await createUsuarioComPerfil(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

module.exports = {cadastrarUsuario};