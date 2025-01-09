import React from 'react';

let nome = "Fernanda"

const Login = () => {
  return (
    <div>
      <h1 className=''>Página de Login
        {nome == "Fernanda"?'Olá, Fernanda!':'Olá, estranho!'}
        </h1>
    </div>
  );
}


export default Login;
