
const prisma = require('../lib/prisma');

exports.criarPerfil = async (req, res) => {
  const { nome, endereco, data_nascimento, foto_perfil, bio } = req.body;
  const userId = req.userId;

  try {
    const perfil = await prisma.perfil.create({
      data: {
        nome,
        endereco,
        data_nascimento: new Date(data_nascimento),
        foto_perfil,
        bio,
        usuarioId: userId
      }
    });
    res.json(perfil);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar perfil" });
  }
};

exports.getPerfil = async (req, res) => {
  const userId = req.userId;
  const perfil = await prisma.perfil.findUnique({
    where: { usuarioId: userId }
  });
  res.json(perfil);
};
