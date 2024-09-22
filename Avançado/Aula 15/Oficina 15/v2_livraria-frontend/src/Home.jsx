import React, { useState, useEffect } from 'react';
import LivroForm from './components/LivroForm';
import LivroTable from './components/LivroTable';
import Busca from './components/Busca';
import { fetchLivros, adicionarLivro, editarLivro, deletarLivro } from './services/livroService';

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState('');
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anoPublicacao, setAnoPublicacao] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [livroEditando, setLivroEditando] = useState(null); // Verifica se está editando
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Carregar livros ao montar o componente
  useEffect(() => {
    const carregarLivros = async () => {
      setCarregando(true);
      try {
        const response = await fetchLivros();
        setLivros(response.data);
      } catch (error) {
        setMensagemErro('Erro ao carregar os livros.');
      } finally {
        setCarregando(false);
      }
    };
    carregarLivros();
  }, []);

// Função para adicionar ou editar livro
const handleSubmit = async (e) => {
  e.preventDefault();

  // Verificar se todos os campos estão preenchidos
  if (!titulo || !autor || !anoPublicacao) {
    alert('Preencha todos os campos.');
    return;
  }

  // Preparar o objeto do novo livro
  const novoLivro = {
    titulo,
    autor,
    anoPublicacao: Number(anoPublicacao), // Certifique-se de que o ano é um número
  };

  try {
    setCarregando(true); // Exibir o indicador de carregamento

    if (livroEditando) {
      // Se estiver editando um livro existente
      const response = await editarLivro(livroEditando.id, novoLivro);
      setLivros((prevLivros) =>
        prevLivros.map((livro) => (livro.id === livroEditando.id ? response.data : livro))
      );
    } else {
      // Se for adicionar um novo livro
      const response = await adicionarLivro(novoLivro);
      setLivros((prevLivros) => [...prevLivros, response.data]);
    }

    // Limpar os campos do formulário após adicionar ou editar
    setTitulo('');
    setAutor('');
    setAnoPublicacao('');
    setLivroEditando(null); // Sair do modo de edição
    setMostrarFormulario(false); // Fechar o formulário após operação
  } catch (error) {
    setMensagemErro('Erro ao salvar o livro.');
    console.error('Erro ao salvar o livro:', error);
  } finally {
    setCarregando(false); // Finalizar o carregamento
  }
};

  // Função para iniciar a edição de um livro
  const iniciarEdicao = (livro) => {
    setLivroEditando(livro);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setAnoPublicacao(livro.anoPublicacao);
    setMostrarFormulario(true);
  };

  // Função para deletar livro
  const handleDelete = async (id) => {
    setCarregando(true);
    try {
      await deletarLivro(id);
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (error) {
      setMensagemErro('Erro ao deletar o livro.');
    } finally {
      setCarregando(false);
    }
  };

  // Filtrar livros pelo campo de busca
  const livrosFiltrados = livros.filter((livro) =>
    livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    livro.autor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Lista de Livros</h2>

      {mensagemErro && <div className="error-message">{mensagemErro}</div>}
      {carregando && <div className="loading">Carregando...</div>}

      <Busca busca={busca} setBusca={setBusca} />

      <LivroTable livros={livrosFiltrados} iniciarEdicao={iniciarEdicao} deletarLivro={handleDelete} />

      <button className="submit-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? 'Cancelar' : 'Adicionar Livro'}
      </button>

      {mostrarFormulario && (
        <LivroForm
          titulo={titulo}
          autor={autor}
          anoPublicacao={anoPublicacao}
          setTitulo={setTitulo}
          setAutor={setAutor}
          setAnoPublicacao={setAnoPublicacao}
          handleSubmit={handleSubmit}
          livroEditando={livroEditando}
        />
      )}
    </div>
  );
};

export default Home;
