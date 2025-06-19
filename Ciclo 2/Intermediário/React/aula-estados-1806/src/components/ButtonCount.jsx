import { useState } from "react";


function ButtonCount() {

const [contador, setContador] = useState(0)

return (

    <button onClick={() => setContador(contador + 1)} >
        Cliquei {contador} vezes
    </button>
);
    
}

export default ButtonCount;