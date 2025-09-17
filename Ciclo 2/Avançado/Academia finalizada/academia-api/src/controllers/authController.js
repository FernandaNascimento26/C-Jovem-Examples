// controllers/authController.js
// Controller de autenticação (login e registro de aluno) usando userModel.
// Inclui melhorias: normalização de email, try/catch, checagem do JWT_SECRET.

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  findUserByEmail,
  createAlunoWithUser,
} = require('../models/userModel');
const e = require('express');

// Função utilitária: assina o JWT com dados relevantes do user
function signToken(user) {
  // Garante que a chave existe; falhar cedo evita tokens inválidos em produção
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido no ambiente (.env)');
  }

  return jwt.sign(
    {
      sub: user.id,                   // subject → id do usuário
      role: user.role,                // 'ALUNO' | 'PROFESSOR' | 'ADMIN'
      aluno_id: user.aluno_id ?? null // se for aluno, id do aluno associado
    },
    process.env.JWT_SECRET,           // chave secreta do .env
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' } // expiração (default 1 dia)
  );
}

// =======================================
// POST /auth/login { email, password }
// - Autentica usuário (email/senha)
// - Retorna { token, user: { id, role, aluno_id, email } }
// =======================================
async function login(req, res) {
  try {
    let { email, password } = req.body;

    // validação simples de presença
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // normaliza email (evita duplicidade 'A@a.com' vs 'a@a.com')
    email = String(email).trim().toLowerCase();

    // busca user pelo email
    const user = await findUserByEmail(email);

    // se não achou ou não tem hash, falha de credenciais
    if (!user || !user.password_hash) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // compara senha com o hash armazenado
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    // gera token JWT
    const token = signToken(user);

    // resposta segura (NUNCA retornar password_hash)
    return res.json({
      token,
      user: {
        id: user.id,
        role: user.role,
        aluno_id: user.aluno_id,
        email: user.email,
      },
    });
  } catch (err) {
    // log interno opcional: console.error(err);
    return res.status(500).json({ error: 'Erro ao autenticar.' });
  }
}

// ========================================================
// POST /auth/register-aluno
// - Cria um ALUNO e um USER vinculado (role ALUNO) em transação.
// - Body: { nome, data_nascimento: 'YYYY-MM-DD', email, password }
// - Retorna { aluno, user }
// ========================================================
async function registerAluno(req, res) {
  try {
    let { nome, data_nascimento, email, password } = req.body;

    // valida obrigatórios
    if (!nome || !data_nascimento || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    // normaliza email
    email = String(email).trim().toLowerCase();

    // checa duplicidade
    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }

    // valida senha mínima (opcional; pode mover p/ front também)
    if (String(password).length < 6) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 6 caracteres.' });
    }

    // gera hash seguro da senha
    const password_hash = await bcrypt.hash(password, 10);

    // cria aluno + user via transação do model
    const { a, u } = await createAlunoWithUser({
      nome,
      data_nascimento: new Date(data_nascimento),
      email,
      password_hash,
    });

    return res.status(201).json({
      aluno: a,
      user: {
        id: u.id,
        email: u.email,
        role: u.role,
        aluno_id: u.aluno_id,
      },
    });
  } catch (err) {
    // trata violação de unique em user.email (P2002)
    if (err?.code === 'P2002') {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }
    // log interno opcional: console.error(err);
    return res.status(500).json({ error: err.message});
  }
}

module.exports = { login, registerAluno };
