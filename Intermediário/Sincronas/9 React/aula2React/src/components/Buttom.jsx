import React,{useState} from 'react';

function Button() {
    const [counter, setCounter] = useState(0);

    const max = 10;
    const min = 0;

    const increment = () => {
        if (counter < max) {
            setCounter(counter + 1);
        }
    }

    const decrement = () => {
        if (counter > min) {
            setCounter(counter - 1);
        }
    }
   
    return (
        <>
        
        <p>{counter}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
    
    </>
    )
}

export default Button;