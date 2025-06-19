import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ tem que estar no topo
import { obterPerfil } from '../services/perfilService';
import { logout } from '../utils/auth';

export default function Perfil() {
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate(); // ✅ fora de if/else ou useEffect

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    obterPerfil(token)
      .then((res) => setPerfil(res.data))
      .catch(() => {
        logout();
        navigate('/login');
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!perfil) return <p className="text-light text-center mt-5">Carregando perfil...</p>;

  return (
    <div className="container mt-5 text-light">
      <div className="card bg-dark text-light p-4">
        <h3 className="mb-3">{perfil.nome}</h3>
        <img src={perfil.foto_perfil} alt="foto" width={150} className="rounded mb-3" />
        <p><strong>Endereço:</strong> {perfil.endereco}</p>
        <p><strong>Data de Nascimento:</strong> {new Date(perfil.data_nascimento).toLocaleDateString()}</p>
        <p><strong>Bio:</strong> {perfil.bio}</p>
        <button onClick={handleLogout} className="btn btn-danger mt-3">Sair</button>
      </div>
    </div>
  );
}
