const prisma = require('../prisma');

const createUsuarioComPerfil = async (data) => {
    const { tipo, email, senha, ...dadosPerfil } = data;
  
    if (tipo === 'PROFISSIONAL') {
      dadosPerfil.quant_atend_gratis = parseInt(dadosPerfil.quant_atend_gratis, 10);
      dadosPerfil.idade = parseInt(dadosPerfil.idade, 10);
      dadosPerfil.valor = parseFloat(dadosPerfil.valor);
    }
  
    const usuario = await prisma.usuario.create({
      data: {
        email,
        senha,
        tipo,
        [tipo === 'PACIENTE' ? 'pacientes' : 'profissionais']: {
          create: dadosPerfil
        }
      },
      include: {
        profissionais: true,
        pacientes: true
      }
    });
  
    return usuario;
  };
  
module.exports = { createUsuarioComPerfil };