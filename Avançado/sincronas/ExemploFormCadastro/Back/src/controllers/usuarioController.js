const { createUsuario } = require('../models/usuarioModel');

const criarUsuario = async (req, res) => {
  try {
    const { email, senha, nome, tipo } = req.body;
    
    // Validação básica
    if (!email || !senha || !nome || !tipo) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se o tipo é válido
    if (!['PACIENTE', 'PROFISSIONAL'].includes(tipo)) {
      return res.status(400).json({ error: "Tipo de usuário inválido" });
    }

    const usuario = await createUsuario({
      email,
      senha, 
      nome,  
      tipo,
      ...(tipo === 'PACIENTE' && { pacientes: { create: { nome } } }),
      ...(tipo === 'PROFISSIONAL' && { profissionais: { create: { nome } } })
    });

    const response = {
      usuarioId: usuario.id,
      perfilId: tipo === 'PACIENTE' 
        ? usuario.pacientes[0].id 
        : usuario.profissionais[0].id
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Erro no controller:", error);
    
    // Tratamento específico para erros do Prisma
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Email já está em uso" });
    }
    
    res.status(400).json({ 
      error: "Erro ao criar usuário",
      details: error.message 
    });
  }
};

module.exports = { criarUsuario };