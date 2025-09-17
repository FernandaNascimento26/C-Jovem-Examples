// models/userModel.js
// Centraliza o acesso à tabela "user" (autenticação).
// Sempre usar a MESMA instância do Prisma (../prisma)
const prisma = require('../prisma');

//
// Busca um usuário pelo email (login, checar duplicidade)
// OBS: normalizar o email (lowercase) deve ser feito antes de chegar aqui.
//
async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email }, // email é único
  })
  .catch((err) => { throw err; }); // propaga erro para o chamador tratar
}
//
// Busca um usuário pelo id (útil para fluxos como troca de senha).
//
async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id: Number(id) },
  });
}

//
// Cria um usuário "puro" (sem criar aluno).
// Útil para seedar PROFESSOR/ADMIN, por exemplo.
//
async function createUser({ email, password_hash, role = 'ALUNO', aluno_id = null }) {
  return prisma.user.create({
    data: {
      email,          // único
      password_hash,  // hash do bcrypt
      role,           // 'ALUNO' | 'PROFESSOR' | 'ADMIN' (enum no Prisma)
      aluno_id,       // se user-aluno, vincule ao aluno correspondente
    },
  });
}

//
// Transação: cria ALUNO e o USER vinculado (role ALUNO).
// - Atomicidade: se algo falha, nada é persistido.
// - Retorna { a, u } (aluno e user criados).
//
async function createAlunoWithUser({ nome, data_nascimento, email, password_hash }) {
  return prisma.$transaction(async (tx) => {
    // cria aluno
    const a = await tx.aluno.create({
      data: { nome, data_nascimento }, // data_nascimento = 'YYYY-MM-DD' (DATE puro)
    });

    // cria user vinculado
    const u = await tx.user.create({
      data: {
        email,
        password_hash,
        role: 'ALUNO',
        aluno_id: a.id_aluno,
      },
    });

    return { a, u };
  });
}

//
// Atualiza a senha do usuário (hash NOVO já recebido).
//
async function updateUserPassword(userId, new_password_hash) {
  return prisma.user.update({
    where: { id: Number(userId) },
    data: { password_hash: new_password_hash },
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  createAlunoWithUser,
  updateUserPassword,
};
