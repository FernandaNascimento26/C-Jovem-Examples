const prisma = require('../prismaClient');

// Controlador para obter todos os itens do menu
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await prisma.menu.findMany();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os itens do menu' });
  }
};

const addMenuItems = async (req, res) => {
  const { menuItems } = req.body;

  try {
      // Adiciona os itens por categoria
      for (const category in menuItems) {
          const items = menuItems[category];

          for (const itemName in items) {
              const price = items[itemName];

              await prisma.menu.create({
                  data: {
                      name: itemName,
                      price: price,
                      category: category,
                  },
              });
          }
      }

      res.status(201).json({ message: 'Itens do menu adicionados com sucesso!' });
  } catch (error) {
      console.error('Erro ao adicionar itens do menu:', error);
      res.status(500).json({ error: 'Erro ao adicionar itens do menu' });
  }
};

  // Atualizar um item do menu
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;

  try {
      const updatedItem = await prisma.menu.update({
          where: { id: parseInt(id) },
          data: { name, price, category },
      });
      res.status(200).json(updatedItem);
  } catch (error) {
      console.error('Erro ao atualizar o item do menu:', error);
      res.status(500).json({ error: 'Erro ao atualizar o item do menu' });
  }
};

// Remover um item do menu
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
      await prisma.menu.delete({
          where: { id: parseInt(id) }
      });
      res.status(204).end(); // No content, sucesso
  } catch (error) {
      console.error('Erro ao remover o item do menu:', error);
      res.status(500).json({ error: 'Erro ao remover o item do menu' });
  }
};



module.exports = { getAllMenuItems, addMenuItems,updateMenuItem,deleteMenuItem };
