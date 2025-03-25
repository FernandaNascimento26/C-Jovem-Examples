const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateProfissional = async (id, data) => {
  return await prisma.profissional.update({
    where: { id: parseInt(id) },
    data
  });
};

module.exports = { updateProfissional };