const prisma = require('../prismaClient');



const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ error: 'Erro ao buscar os pedidos' });
    }
};


const createOrder = async (req, res) => {
    const { name, tableNumber, items } = req.body;

    try {
        // Busca o preço dos itens diretamente no banco de dados ou de um local confiável
        const menuItems = await prisma.menu.findMany(); // Exemplo: você poderia adaptar isso à sua estrutura de dados.

        // Calcula o total no servidor
        const totalPrice = items.reduce((total, item) => {
            const menuItem = menuItems.find(menu => menu.category === item.category && menu.name === item.name);
            const price = menuItem ? menuItem.price : 0;
            return total + (price * item.quantity);
        }, 0);

        // Criação do pedido no banco de dados
        const newOrder = await prisma.order.create({
            data: {
                name,
                tableNumber,
                items,
                totalPrice, // Calculado no backend
            },
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ error: "Erro ao criar pedido" });
    }
};
module.exports = {getAllOrders, createOrder};
