import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState(''); // Estado para armazenar a busca
  const [titulo, setTitulo] = useState('');  // Estado para o campo de título
  const [autor, setAutor] = useState('');    // Estado para o campo de autor
  const [anoPublicacao, setAnoPublicacao] = useState('');  // Estado para o campo de ano de publicação
  const [mostrarFormulario, setMostrarFormulario] = useState(false);  // Controla a exibição do formulário
  const [livroEditando, setLivroEditando] = useState(null);  // Estado para armazenar o livro em edição
  const [mensagemErro, setMensagemErro] = useState(''); // Aqui criamos o estado de erro
  const [carregando, setCarregando] = useState(true);  // Estado para o loader (carregando)



  

// Carregar os livros da API quando o componente for montado
  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/livros');
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar os livros:', error);
        setMensagemErro("Ops, não conseguimos carregar os livros. Tente novamente mais tarde.");
      } finally {
        setCarregando(false);  // Finaliza o carregamento, independentemente do sucesso ou falha
      }
    };

    fetchLivros(); // Chama a função assim que o componente for montado
  }, []);

// Função para adicionar um novo livro
const adicionarLivro = async (e) => {
    e.preventDefault();

    // Verifique se todos os campos estão preenchidos
    if (!titulo || !autor || !anoPublicacao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Preparar o objeto do novo livro
    const novoLivro = {
      titulo,
      autor,
      anoPublicacao: Number(anoPublicacao),
    };

    try {
      const response = await axios.post('http://localhost:3000/livros', novoLivro);
      
      // Atualizar a lista de livros com o novo livro adicionado
      setLivros([...livros, response.data]);
      
      // Limpar o formulário
      setTitulo('');
      setAutor('');
      setAnoPublicacao('');
      
      // Esconder o formulário após adicionar o livro
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Erro ao adicionar o livro:', error);
      setMensagemErro("Não foi possível adicionar o livro. Por favor, verifique os dados e tente novamente.");
    } finally {
        setCarregando(false);  // Finaliza o carregamento, independentemente do sucesso ou falha
      }
  };

  // Função para iniciar a edição de um livro
const iniciarEdicao = (livro) => {
    setLivroEditando(livro);
    setTitulo(livro.titulo);  // Preenche os campos com os dados do livro
    setAutor(livro.autor);
    setAnoPublicacao(livro.anoPublicacao);
    setMostrarFormulario(true);  // Exibe o formulário de edição
  };
  
  // Função para salvar as alterações do livro em edição
const salvarEdicaoLivro = async (e) => {
    e.preventDefault();
    
    if (!titulo || !autor || !anoPublicacao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    const livroAtualizado = {
      titulo,
      autor,
      anoPublicacao: Number(anoPublicacao),
    };
  
    try {
      const response = await axios.put(`http://localhost:3000/livros/${livroEditando.id}`, livroAtualizado);
      
      // Atualiza a lista de livros com o livro editado
      setLivros(livros.map((livro) => (livro.id === livroEditando.id ? response.data : livro)));
      
      // Limpa o formulário e o estado de edição
      setTitulo('');
      setAutor('');
      setAnoPublicacao('');
      setLivroEditando(null);
      setMostrarFormulario(false);  // Esconde o formulário após salvar a edição
    } catch (error) {
      console.error('Erro ao salvar o livro editado:', error);
    } finally {
        setCarregando(false);  // Finaliza o carregamento, independentemente do sucesso ou falha
      }
  };
  

// Função para deletar um livro
const deletarLivro = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/livros/${id}`);
      
      // Remove o livro deletado da lista de livros
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o livro:', error);
    }
  };


  // Filtrar livros com base no valor de busca
  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase()) // Filtra também por autor, se desejar
  );

  <input
    type="text"
    placeholder="Buscar livro..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)} // Atualiza o estado de busca
  />


  return (
    <div className="container">
      <h2>Lista de Livros</h2>

      {/* Exibe a mensagem de erro se existir */}
      {mensagemErro && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {mensagemErro}
        </div>
      )}

       {/* Campo de busca */}
       <input 
        type="text" 
        placeholder="Buscar livro por título" 
        value={busca} 
        onChange={(e) => setBusca(e.target.value)} 
      />
      {/* Exibe "Carregando..." enquanto os livros estão sendo buscados */}
      {carregando && (
        <div className="loading" style={{ margin: '10px 0', fontWeight: 'bold' }}>
          Carregando...
        </div>
      )}

      {/* Exibe a tabela de livros somente se não estiver mais carregando e não houver erros */}
      {!carregando && !mensagemErro && (
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
        {livrosFiltrados.length > 0 ? (
            livrosFiltrados.map((livro, index) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.anoPublicacao}</td>
              <td><button className="edit-btn" onClick={() => iniciarEdicao(livro)}>Editar</button>
              <button className="delete-btn" onClick={() => deletarLivro(livro.id)}>Deletar</button>
              </td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum livro encontrado</td>
            </tr>
        )}
        </tbody>
      </table>
      )}
      {/* Botão para adicionar um novo livro */}
      <button className="submit-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Cancelar' : 'Adicionar Livro'}
      </button>

         {/* Formulário de adição de livro ou edição */}
      {mostrarFormulario && (
        <form onSubmit={livroEditando ? salvarEdicaoLivro : adicionarLivro}>
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
      )}
    </div>
    
  );
};

export default Home;
