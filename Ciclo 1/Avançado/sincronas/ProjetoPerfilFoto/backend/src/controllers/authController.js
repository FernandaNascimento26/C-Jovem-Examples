
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

const SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const hash = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: { email, senha: hash }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(500).json({ error: "Erro no login" });
  }
};
