// src/components/StateSection.jsx
import { useState } from "react";

const Secao4 = () => {
  const [count, setCount] = useState(0);

  return (
    <section id="s4" className="section">
      <h2>Gerenciamento de Estado</h2>
      <p>O estado no React permite atualizar a UI de forma dinâmica.</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui: {count}</button>
    </section>
  );
};

export default Secao4;
