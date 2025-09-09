// Este model centraliza o acesso à tabela "user" (autenticação).
const prisma = require('../prisma');

//
// Busca um usuário pelo email (para login, checar duplicidade no cadastro, etc.)
//
async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

//
// Busca um usuário pelo id (às vezes útil para trocar senha etc.)
//
async function findUserById(user_id) {
  return prisma.user.findUnique({
    where: { user_id: Number(id) },
  });
}

//
// Cria um usuário "puro" (sem relação com aluno).
// Útil para criar PROFESSOR/ADMIN, por exemplo.
//
async function createUser({ email, password_hash, regra = 'ALUNO', aluno_id = null }) {
  return prisma.user.create({
    data: {
      email,
      password_hash,
      regra,
      aluno_id, // se for um user aluno, vincule o id do aluno aqui
    },
  });
}

//
// Transação: cria um ALUNO e o USER vinculado a ele (role ALUNO).
// - Garante atomicidade: se algo falhar, nada é salvo.
// - Retorna { a, u } com os registros criados.
//
async function createAlunoWithUser({ nome, data_nascimento, email, password_hash }) {
  return prisma.$transaction(async (tx) => {
    // Cria o aluno
    const a = await tx.aluno.create({
      data: { nome, data_nascimento },
    });

    // Cria o usuário vinculado ao aluno
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
// (Opcional) Atualiza a senha do usuário (por id). Útil em "trocar senha".
// Recebe o hash da senha NOVA já preparado (não passe senha em texto puro).
//
async function updateUserPassword(user_id, new_password_hash) {
  return prisma.user.update({
    where: { user_id: Number(user_id) },
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
