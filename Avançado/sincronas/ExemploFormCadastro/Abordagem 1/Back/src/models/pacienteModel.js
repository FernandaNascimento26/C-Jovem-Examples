const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updatePaciente = async (id, data) => {
  return await prisma.paciente.update({
    where: { id: parseInt(id) },
    data
  });
};

module.exports = { updatePaciente };