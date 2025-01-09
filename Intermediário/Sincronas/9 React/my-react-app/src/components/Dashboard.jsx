import React from "react";

function Dashboard({ user, onLogout }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Bem-vindo, {user}!</h1>
      <button
        onClick={onLogout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Sair
      </button>
    </div>
  );
}

export default Dashboard;
