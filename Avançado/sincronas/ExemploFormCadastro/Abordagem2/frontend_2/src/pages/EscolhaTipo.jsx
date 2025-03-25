
import { useLocation, useNavigate } from 'react-router-dom';

export default function EscolhaTipo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const escolher = (tipo) => {
    if (tipo === "PACIENTE") {
      navigate('/cadastro-multi/paciente', { state: { ...state, tipo } });
    }
    if (tipo === "PROFISSIONAL") {
      navigate('/cadastro-multi/profissional', { state: { ...state, tipo } });
    }
  };

  return (
    <div>
      <h2>Como você quer se cadastrar?</h2>
      <button onClick={() => escolher("PACIENTE")}>Sou paciente</button>
      <button onClick={() => escolher("PROFISSIONAL")}>Sou profissional</button>
    </div>
  );
}