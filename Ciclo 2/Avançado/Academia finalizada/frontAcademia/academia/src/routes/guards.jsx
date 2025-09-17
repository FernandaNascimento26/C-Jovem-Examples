// src/routes/guards.jsx
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth({ children }) {
  const { token } = useAuth();
  const loc = useLocation();
  if (!token) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}

export function RequireRoles({ roles = [], children }) {
  const { hasRole } = useAuth();
  if (!hasRole(...roles)) return <Navigate to="/unauthorized" replace />;
  return children;
}

// Acesso “self” do aluno OU roles elevadas
export function RequireAlunoSelfOrRoles({ roles = [], children }) {
  const { user, isAlunoSelf, hasRole } = useAuth();
  const { id } = useParams(); // id = id do aluno na URL (/aluno/:id/treinos)
  const allowed = (user?.aluno_id && isAlunoSelf(id)) || hasRole(...roles);
  if (!allowed) return <Navigate to="/unauthorized" replace />;
  return children;
}
