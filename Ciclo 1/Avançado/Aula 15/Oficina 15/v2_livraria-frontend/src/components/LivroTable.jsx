import React from 'react';

const LivroTable = ({ livros, iniciarEdicao, deletarLivro }) => (
  <table>
    <thead>
      <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Ano de Publicação</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {livros.length > 0 ? (
        livros.map((livro, index) => (
          <tr key={livro.id}>
            <td>{livro.titulo}</td>
            <td>{livro.autor}</td>
            <td>{livro.anoPublicacao}</td>
            <td>
              <button onClick={() => iniciarEdicao(livro)}>Editar</button>
              <button onClick={() => deletarLivro(livro.id)}>Deletar</button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4">Nenhum livro encontrado</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default LivroTable;
