import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarUsuarioCompleto = async (dados) => {
  // Dados comuns para qualquer tipo
  const dadosUsuario = {
    email: dados.email,
    senha: dados.senha, 
    nome: dados.nome,
    tipo: dados.tipo
  };

  // Dados específicos para pacientes
  const dadosPaciente = dados.tipo === 'PACIENTE' ? {
    genero: dados.genero,
    data_nasc: new Date(dados.data_nasc),
    motivo_terapia: dados.motivo_terapia,
    medicamentos: dados.medicamentos,
    historico_familiar: dados.historico_familiar,
    principal_queixa: dados.principal_queixa,
    email_contato: dados.email_contato
  } : undefined;

  // Dados específicos para profissionais
  const dadosProfissional = dados.tipo === 'PROFISSIONAL' ? {
    genero: dados.genero,
    matricula_profissional: dados.matricula_profissional,
    especialidade: dados.especialidade,
    foto_perfil: dados.foto_perfil,
    quant_atend_gratis: parseInt(dados.quant_atend_gratis),
    faixas_etarias: dados.faixas_etarias,
    cidade: dados.cidade,
    estado: dados.estado,
    valor: parseFloat(dados.valor),
    idade: parseInt(dados.idade)
  } : undefined;

  return await prisma.usuario.create({
    data: {
      ...dadosUsuario,
      ...(dadosPaciente && { pacientes: { create: dadosPaciente } }),
      ...(dadosProfissional && { profissionais: { create: dadosProfissional } })
    },
    include: {
      pacientes: dados.tipo === 'PACIENTE',
      profissionais: dados.tipo === 'PROFISSIONAL'
    }
  });
};