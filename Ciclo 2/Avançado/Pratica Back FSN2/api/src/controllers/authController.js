const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Importa as operações do model de usuário
const { findUserByEmail,createAlunoWithUser} = require('../models/userModel');


// Função auxiliar: assina o JWT com dados relevantes do usuário
function signToken(user) {
  return jwt.sign(
    {
      sub: user.user_id,                 // subject → id do usuário
      regra: user.regra,                // papel do usuário (ALUNO, PROFESSOR, ADMIN)
      aluno_id: user.aluno_id ?? null // se for aluno, id do aluno associado
    },
    process.env.JWT_SECRET,           // chave secreta do .env
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // expiração (padrão: 1 dia)
  );
}


// ========================================================
// (Opcional) POST /auth/register-aluno
// - Cria um ALUNO e um USER vinculado (role ALUNO) usando transação no model.
// - Requer: nome, data_nascimento (YYYY-MM-DD), email, password
// ========================================================
async function registerAluno(req, res) {
  const { nome, data_nas, email, password } = req.body;

  // Valida obrigatórios
  if (!nome || !data_nascimento || !email || !password) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }

  // Verifica se email já existe
  const exists = await findUserByEmail(email);
  if (exists) {
    return res.status(409).json({ error: 'Email já cadastrado.' });
  }

  // Gera hash da senha
  const password_hash = await bcrypt.hash(password, 10);

  // Usa a função do model que já cria ALUNO + USER em transação
  const { a, u } = await createAlunoWithUser({
    nome,
    data_nas, // DATE puro (YYYY-MM-DD) aceito pelo Prisma por causa do @db.Date
    email,
    password_hash,
  });

  // Retorna 201 com dados do aluno e do user recém-criados
  return res.status(201).json({
    aluno: a,
    user: {
      user_id: u.user_id,
      email: u.email,
      regra: u.regra,
      aluno_id: u.aluno_id,
    },
  });
}


// =======================================
// POST /auth/login { email, password }
// - Autentica usuário por email/senha
// - Retorna token JWT e dados públicos do usuário
// =======================================
async function login(req, res) {
  const { email, password } = req.body;

  // Valida presença dos campos
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  // Busca usuário pelo email via model
  const user = await findUserByEmail(email);

  // Se não encontrou ou não tem hash de senha → credenciais inválidas
  if (!user || !user.password_hash) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  // Compara senha enviada com o hash armazenado
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  // Gera o token JWT
  const token = signToken(user);

  // Responde com token + dados públicos do usuário (NUNCA enviar password_hash)
  return res.json({
    token,
    user: {
      id: user.id,
      regra: user.regra,
      aluno_id: user.aluno_id,
      email: user.email,
    },
  });
}

