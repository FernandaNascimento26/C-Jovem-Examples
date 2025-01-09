import { useState } from 'react';

const Button = () => {
    const[count, setCount] = useState(0);

    const max = 10;
    const min = 0;

    const incrementar = () => {    
        if (count < max) {
        setCount (count + 1)
        }
    }

    const decrementar = () => { 
        if (count > min) {   
        setCount (count - 1)
        }
    }


    return (
        <div>
            <button onClick={incrementar}>+</button>

            <h1>{count}</h1>

            <button onClick={decrementar}>-</button>
        </div>
    )
}

export default Button;