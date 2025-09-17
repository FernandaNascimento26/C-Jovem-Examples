const jwt = require('jsonwebtoken');

// =======================================
// Middleware requireAuth
// Garante que a requisição está autenticada com um token válido
// =======================================
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';

  // O padrão é "Bearer <token>"
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Não autenticado.' });

  try {
    // Verifica e decodifica o token usando a chave secreta
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Anexa os dados do usuário no req para uso posterior
    // payload contém: { sub, role, aluno_id, iat, exp }
    req.user = payload;

    next(); // segue para o próximo middleware/handler
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

// =======================================
// Middleware requireRoles
// Permite apenas usuários que tenham uma das roles especificadas
// Ex: requireRoles('ADMIN', 'PROFESSOR')
// =======================================
function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Não autenticado.' });

    // Se a role do usuário não está na lista permitida → 403 (forbidden)
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: 'Sem permissão.' });

    next();
  };
}

// =======================================
// Middleware requireSelfAlunoOrRoles
// Permite acesso se:
//   - o usuário for o próprio aluno (id do token = id do recurso)
//   - OU tiver uma role de administrador/professor passada
//
// Exemplo: requireSelfAlunoOrRoles('ADMIN', 'PROFESSOR')
// =======================================
function requireSelfAlunoOrRoles(...roles) {
  return (req, res, next) => {
    // id do recurso (aluno) da rota
    const alvoId = Number(req.params.id_aluno || req.params.aluno_id);

    // é o próprio aluno? (user.aluno_id do token = id do recurso)
    const isSelf =
      req.user?.aluno_id && alvoId === Number(req.user.aluno_id);

    // tem uma role autorizada (ex: ADMIN ou PROFESSOR)?
    const hasRole = req.user && roles.includes(req.user.role);

    if (isSelf || hasRole) return next();

    return res.status(403).json({ error: 'Sem permissão.' });
  };
}

module.exports = { requireAuth, requireRoles, requireSelfAlunoOrRoles };
