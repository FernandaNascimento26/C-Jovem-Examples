import { criarUsuarioCompleto } from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

export const criarUsuarioCompleto = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);
    const dados = { ...req.body, senha: hashedPassword };

    const resultado = await criarUsuarioCompleto(dados);
    
    res.status(201).json({
      id: resultado.id,
      tipo: resultado.tipo,
      perfilId: resultado.tipo === 'PACIENTE' 
        ? resultado.pacientes[0]?.id 
        : resultado.profissionais[0]?.id
    });
    
  } catch (error) {
    console.error("Erro no controller:", error);
    res.status(400).json({ 
      error: error.message,
      details: error.code === 'P2002' ? 'Email já cadastrado' : undefined
    });
  }
};