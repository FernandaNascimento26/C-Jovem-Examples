const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    console.log("Dados recebidos no backend:", req.body);
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

    const userExists = await UserModel.findUserByEmail(email);
    if (userExists) return res.status(400).json({ error: "Email já cadastrado" });

    await UserModel.createUser({ nome, email, senha, tipo });
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await UserModel.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(401).json({ error: "Senha inválida" });

    const token = jwt.sign(
      { userId: user.id, tipo: user.tipo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};

module.exports = { register, login };
