const prisma = require('../config/prismaClient');

// Função para listar todos os livros
exports.getLivros = async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};

exports.getLivroById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const livro = await prisma.livro.findUnique({
      where: { id: Number(id) },
    });
    
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o livro' });
  }
};

// Função para adicionar um novo livro
exports.createLivro = async (req, res) => {
  const { titulo, autor, anoPublicacao } = req.body;
  try {
    const novoLivro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        anoPublicacao,
      },
    });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar o livro' });
  }
};

// Função para atualizar um livro existente
exports.updateLivro = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anoPublicacao } = req.body;
  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(id) },
      data: {
        titulo,
        autor,
        anoPublicacao,
      },
    });
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado' });
  }
};

// Função para excluir um livro
exports.deleteLivro = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.livro.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado' });
  }
};
