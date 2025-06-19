import React, {useState} from "react";

function Bottom() {
  const [count, setCount] = useState(0);
  return (
    <>
          <p>{count}</p>

    <button onClick={()=> setCount(count -1)}>-</button>
    <button onClick={()=> setCount(count +1)}>+</button>
    </>
  );
}

export default Bottom;