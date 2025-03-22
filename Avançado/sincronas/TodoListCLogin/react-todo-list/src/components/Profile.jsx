import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserProfile();
        setUser(response.data);
      } catch (error) {
        navigate("/login"); // Se não estiver autenticado, redireciona
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <div className="container">
      <h2>Perfil do Usuário</h2>
      {user ? (
        <div className="profile-info">
          <p><strong>Nome:</strong> {user.nome}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Tipo:</strong> {user.tipo === "TIPO1" ? "Administrador" : "Usuário Comum"}</p>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default Profile;
