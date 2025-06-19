import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './OrderPage.css';

function OrderPage() {
    const [order, setOrder] = useState({
        name: '',
        tableNumber: '',
        items: []
    });

    const [menuItems, setMenuItems] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');
    const [currentItem, setCurrentItem] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState(1);

    // Função para buscar os itens do menu do backend
    useEffect(() => {
        axios.get('http://localhost:4000/api/menu')
            .then(response => {
                const categories = {
                    cafes: {},
                    sobremesas: {},
                    especiais: {},
                    bebidasGeladas: {},
                    chas: {}
                };

                // Organiza os itens por categoria
                response.data.forEach(item => {
                    if (categories[item.category]) {
                        categories[item.category][item.name] = item.price;
                    }
                });

                setMenuItems(categories);
            })
            .catch(error => {
                console.error('Erro ao buscar itens do menu:', error);
            });
    }, []);

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setCurrentItem('');
        setCurrentQuantity(1);
        setShowModal(true);
    };

    const handleAddItem = () => {
        if (!currentItem || currentQuantity <= 0) {
            alert('Por favor, selecione um item e uma quantidade válida.');
            return;
        }

        const updatedItems = [...order.items];
        const existingItemIndex = updatedItems.findIndex(item => item.category === currentCategory && item.name === currentItem);

        if (existingItemIndex !== -1) {
            updatedItems[existingItemIndex].quantity += currentQuantity;
        } else {
            updatedItems.push({ category: currentCategory, name: currentItem, quantity: currentQuantity });
        }

        setOrder({
            ...order,
            items: updatedItems
        });

        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Envia o pedido para o backend, sem calcular o total no frontend
        axios.post('http://localhost:4000/api/orders', {
            name: order.name,
            tableNumber: order.tableNumber,
            items: order.items,
        })
        .then(response => {
            alert(`Pedido enviado com sucesso! Valor total: R$ ${response.data.totalPrice.toFixed(2)}`);
            setOrder({
                name: '',
                tableNumber: '',
                items: []
            });
        })
        .catch(error => {
            console.error('Erro ao enviar o pedido:', error);
            alert('Erro ao enviar o pedido.');
        });
    };    

    return (
        <div className="order-container">
            <h2>Faça seu pedido</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={order.name}
                        onChange={(e) => setOrder({ ...order, name: e.target.value })}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tableNumber">Número da Mesa:</label>
                    <input
                        type="text"
                        id="tableNumber"
                        name="tableNumber"
                        value={order.tableNumber}
                        onChange={(e) => setOrder({ ...order, tableNumber: e.target.value })}
                        required
                    />
                </div>

                <div className="menu-category-list">
                    {Object.keys(menuItems).map((category) => (
                        <Button key={category} onClick={() => handleCategoryClick(category)} className="category-button">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                    ))}
                </div>

                <button type="submit">Enviar Pedido</button>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecione o item e a quantidade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="itemSelect">Item:</label>
                        <select
                            id="itemSelect"
                            name="itemSelect"
                            value={currentItem}
                            onChange={(e) => setCurrentItem(e.target.value)}
                            className="form-control"
                        >
                            <option value="">Selecione um item</option>
                            {Object.keys(menuItems[currentCategory] || {}).map((item) => (
                                <option key={item} value={item}>{item} - R$ {menuItems[currentCategory][item].toFixed(2)}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantidade:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={currentQuantity}
                            onChange={(e) => setCurrentQuantity(parseInt(e.target.value))}
                            min="1"
                            className="form-control"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleAddItem}>
                        Adicionar ao Pedido
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OrderPage;
