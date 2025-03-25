import { useNavigate } from 'react-router-dom';

export default function EscolherTipo() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>De qual forma você quer fazer parte da nossa comunidade?</h2>
      <button onClick={() => navigate("/cadastro/paciente")}>
        quero ajuda psicológica
      </button>
      <button onClick={() => navigate("/cadastro/profissional")}>
        quero atuar como profissional
      </button>
    </div>
  );
}
