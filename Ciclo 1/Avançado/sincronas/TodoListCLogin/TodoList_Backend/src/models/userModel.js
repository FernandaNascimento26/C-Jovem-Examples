const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

class UserModel {
  static async createUser({ nome, email, senha, tipo }) {
    const hashedPassword = await bcrypt.hash(senha, 10);
    return prisma.user.create({
      data: { nome, email, senha: hashedPassword, tipo },
    });
  }

  static async findUserByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async getUserProfile(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true, email: true, tipo: true, createdAt: true }
    });
  }
}

module.exports = UserModel;
