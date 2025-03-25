const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUsuario = async (data) => {
  // Validação adicional no model
  if (!data.email || !data.senha || !data.tipo || !data.nome) {
    throw new Error("Dados incompletos para criação de usuário");
  }

  return await prisma.usuario.create({
    data: {
      email: data.email,
      senha: data.senha, // Lembre-se de hash esta senha! - passos que estão no exemplo do TodoList
      nome: data.nome,   
      tipo: data.tipo,
      ...(data.tipo === 'PACIENTE' && {
        pacientes: {
          create: { nome: data.nome }
        }
      }),
      ...(data.tipo === 'PROFISSIONAL' && {
        profissionais: {
          create: { nome: data.nome }
        }
      })
    },
    include: {
      pacientes: data.tipo === 'PACIENTE',
      profissionais: data.tipo === 'PROFISSIONAL'
    }
  });
};

module.exports = { createUsuario };