const UserModel = require("../models/userModel");

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.getUserProfile(userId);

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
  }
};

module.exports = { getUserProfile };
