import { useEffect, useState } from "react";
// Importa os hooks useEffect e useState do React

function BemVindo() {
    // Define um estado 'hora' inicializado com a hora atual formatada
    const [hora, setHora] = useState(new Date().toLocaleTimeString());

    // useEffect é usado para efeitos colaterais (side effects)
    useEffect(() => {
        // Cria um intervalo que atualiza a hora a cada 60.000ms (1 minuto)
        const intervalo = setInterval(() => {
            setHora(new Date().toLocaleTimeString());
        }, 60000);

        // Função de limpeza que é executada quando o componente é desmontado
        return () => clearInterval(intervalo);
       
    }, []); // Array de dependências vazio significa que o efeito roda apenas no mount/unmount

    return(
        <>
            <h2>Hora atual: </h2>
            <p>{hora}</p>
        </>
    );
}

export default BemVindo;