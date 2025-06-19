import React from 'react';

const LivroForm = ({ titulo, autor, anoPublicacao, setTitulo, setAutor, setAnoPublicacao, handleSubmit, livroEditando }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Título:</label>
      <input 
        type="text" 
        value={titulo} 
        onChange={(e) => setTitulo(e.target.value)} 
        required 
      />
    </div>
    <div>
      <label>Autor:</label>
      <input 
        type="text" 
        value={autor} 
        onChange={(e) => setAutor(e.target.value)} 
        required 
      />
    </div>
    <div>
      <label>Ano de Publicação:</label>
      <input 
        type="number" 
        value={anoPublicacao} 
        onChange={(e) => setAnoPublicacao(e.target.value)} 
        required 
      />
    </div>
    <button type="submit">
      {livroEditando ? 'Salvar Alterações' : 'Salvar Livro'}
    </button>
  </form>
);

export default LivroForm;
