import React from 'react';

const Busca = ({ busca, setBusca }) => (
  <input
    type="text"
    placeholder="Buscar livro por título ou autor"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />
);

export default Busca;
