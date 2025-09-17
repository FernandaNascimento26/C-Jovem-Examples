// NOVO: helpers para esconder/mostrar pedaços do UI conforme regra
import { useAuth } from '../context/AuthContext';

export function Only({ regras = [], children }) {
  const { user } = useAuth();
  if (!regras.length) return null;
  return regras.includes(user?.regra) ? children : null;
}

export function OnlySelf({ alunoId, fallback = null, children }) {
  const { user } = useAuth();
  return user?.regra === 'ALUNO' && Number(user?.aluno_id) === Number(alunoId) ? children : fallback;
}
