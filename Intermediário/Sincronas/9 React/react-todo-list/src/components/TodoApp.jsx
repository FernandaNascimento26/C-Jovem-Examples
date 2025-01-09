import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [tarefa, setTarefa] = useState("");
  const [lista, setLista] = useState([]);

  const adicionarTarefa = () => {
    if (tarefa.trim() === "") {
      alert("Por favor, insira uma tarefa!");
      return;
    }

    const novaTarefa = { texto: tarefa, concluida: false };
    setLista([...lista, novaTarefa]);
    setTarefa("");
  };



  const removerTarefa = (index) => {
    setLista(lista.filter((_, i) => i !== index));
  };

  const alternarConcluida = (index) => {
    setLista(
      lista.map((item, i) =>
        i === index ? { ...item, concluida: !item.concluida } : item
      )
    );
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={tarefa}
        onChange={(e) => setTarefa(e.target.value)}
        placeholder="Digite sua tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar</button>
      <ul>
        {lista.map((item, index) => (
          <TodoItem
            key={index}
            texto={item.texto}
            concluida={item.concluida}
            onToggle={() => alternarConcluida(index)}
            onRemove={() => removerTarefa(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
