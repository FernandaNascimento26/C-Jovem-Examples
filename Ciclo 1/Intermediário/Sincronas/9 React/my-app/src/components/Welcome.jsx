import React from 'react';
import Bottom from './Bottom';

function Welcome() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'pink' }}>
      <h1>Bem vindo</h1>
      <p>
        Este é um exemplo de componente básico com React
      </p>

      
      <Bottom />
    </div>
  );
}

export default Welcome;