import { useEffect, useState } from "react";

function BemVindo(){

    const [hora, setHora] = useState(new Date().toLocaleTimeString());

    useEffect(()=> {

        const intervalo = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 60000);

        return () => clearInterval(intervalo);
       
    }, []);

    return(
    <>
        <h2>Hora atual: </h2>
        <p>{hora}</p>
    </>
    );

}

export default BemVindo;