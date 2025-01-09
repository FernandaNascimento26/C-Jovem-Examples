import React from "react";

function TodoItem({ texto, concluida, onToggle, onRemove }) {
  return (
    <li className={concluida ? "completed" : ""}>
      <span onClick={onToggle} style={{ cursor: "pointer" }}>
        {texto}
      </span>
      <button className="remove" onClick={onRemove}>
        X
      </button>
    </li>
  );
}

export default TodoItem;
