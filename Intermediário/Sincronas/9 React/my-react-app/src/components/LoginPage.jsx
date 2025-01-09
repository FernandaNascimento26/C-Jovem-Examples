import React, { useState } from "react";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (name) onLogin(name);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
