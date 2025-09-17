// routes/treinoRoutes.js
// Rotas de TREINOS com regras de autorização:
// - ALUNO: pode VER apenas os próprios treinos (via /treinos/aluno/:aluno_id);
//          NÃO pode criar/editar/excluir treinos.
// - PROFESSOR: pode VER todos os treinos, e tem CRUD completo (criar/editar/excluir).
// - ADMIN: pode tudo.
// Obs: Para manter simples, a rota de GET por ID do treino está liberada só a PROFESSOR/ADMIN.
//      Para ALUNO, o fluxo recomendado é listar por aluno (/treinos/aluno/:aluno_id).

const express = require('express');
const router = express.Router();

// Importa handlers do controller (já existentes no seu projeto)
const {
  getAllTreinosByAluno,
  getTreinoByIdHandler,
  addTreinoHandler,
  updateTreinoHandler,
  deleteTreinoHandler,
} = require('../controllers/treinoController');

// Middlewares de autenticação/autorização
const {
  requireAuth,
  requireRoles,
  requireSelfAlunoOrRoles,
} = require('../middlewares/auth');

// ============================================================
// GET /treinos/aluno/:aluno_id
// - Lista treinos de UM aluno específico.
// - Permitido ao PRÓPRIO aluno (ver os próprios treinos)
//   OU ao PROFESSOR/ADMIN (pode ver treinos de todos).
// ============================================================
router.get('/aluno/:aluno_id',
  requireAuth, requireSelfAlunoOrRoles('PROFESSOR', 'ADMIN'),
  getAllTreinosByAluno
);

// ============================================================
// GET /treinos/:id_treino
// - Retorna um treino específico.
// - Para simplificar a autorização, liberamos para PROFESSOR/ADMIN.
//   (Se quiser permitir ALUNO aqui, seria necessário checar o dono do treino.)
// ============================================================
router.get(
  '/:id_treino', requireAuth, requireRoles('PROFESSOR', 'ADMIN'),
  getTreinoByIdHandler
);

// ============================================================
// POST /treinos
// - Cria treino.
// - Permitido a PROFESSOR/ADMIN.
// - ALUNO não pode criar treinos.
// ============================================================
router.post(
  '/',
  requireAuth,
  requireRoles('PROFESSOR', 'ADMIN'),
  addTreinoHandler
);

// ============================================================
// PUT /treinos/:id_treino
// - Atualiza treino.
// - Permitido a PROFESSOR/ADMIN.
// - ALUNO não pode editar treinos.
// ============================================================
router.put(
  '/:id_treino',
  requireAuth,
  requireRoles('PROFESSOR', 'ADMIN'),
  updateTreinoHandler
);

// ============================================================
// DELETE /treinos/:id_treino
// - Exclui treino.
// - Permitido a PROFESSOR/ADMIN.
// - ALUNO não pode excluir treinos.
// ============================================================
router.delete(
  '/:id_treino',
  requireAuth,
  requireRoles('PROFESSOR', 'ADMIN'),
  deleteTreinoHandler
);

module.exports = router;
