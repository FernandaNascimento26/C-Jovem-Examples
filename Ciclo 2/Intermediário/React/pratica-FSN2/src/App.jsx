import { useState, useEffect } from 'react'

function App() {
 const [hora, setHora] = useState(new Date().toLocaleTimeString())


 useEffect(() => {
    const intervalo = setInterval(() => {
    setHora(new Date().toLocaleTimeString());
 }, 3000);

 return() => clearInterval(intervalo)

}, []);

  return (
    <>
      
      <div>
        <h2>Hora atual: </h2>
        <p>{hora}</p>
      </div>

    </>
  )
}

export default App
