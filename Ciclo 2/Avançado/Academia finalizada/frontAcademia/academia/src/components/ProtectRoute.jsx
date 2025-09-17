// NOVO: protege rotas por auth e (opcional) por regra(s)
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, regras }) {
  const { isAuth, user } = useAuth();
  if (!isAuth) return <Navigate to="/login" replace />;

  // se regras foi passado, exige regra compatível
  if (regras?.length && !regras.includes(user?.regra)) {
    return <Navigate to="/" replace />;
  }
  return children;
}
