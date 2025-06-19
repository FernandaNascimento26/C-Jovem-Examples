import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';
import './Menu.css';

// Importe suas imagens
import coffee1 from '../assets/images/graos.jpg';
import coffee2 from '../assets/images/petit.jpg';
import coffee3 from '../assets/images/croissant.jpeg';
import coffee4 from '../assets/images/milk.jpeg';
import coffee5 from '../assets/images/cha.jpeg';

function Menu() {
    const [currentImage, setCurrentImage] = useState(coffee1);
    const [menuItems, setMenuItems] = useState({
        cafes: [],
        sobremesas: [],
        especiais: [],
        bebidasGeladas: [],
        chas: []
    });

    // Fetch data from backend on component mount
    useEffect(() => {
        axios.get('http://localhost:4000/api/menu')
            .then(response => {
                const categories = {
                    cafes: [],
                    sobremesas: [],
                    especiais: [],
                    bebidasGeladas: [],
                    chas: []
                };

                // Organize items by category
                response.data.forEach(item => {
                    if (categories[item.category]) {
                        categories[item.category].push(item);
                    }
                });

                setMenuItems(categories);
            })
            .catch(error => {
                console.error('Erro ao buscar os itens do menu:', error);
            });
    }, []);

    return (
        <div className="menu-container">
            <div className="menu-header">
                <h1>Café do Amanhã</h1>
            </div>

            <div className="menu-content">
                <div className="menu-image">
                    <img src={currentImage} alt="Menu" />
                </div>

                <div className="menu-tabs">
                    <Tabs 
                        defaultActiveKey="cafes"
                        id="styled-menu-tabs"
                        className="mb-3"
                        onSelect={(key) => {
                            switch (key) {
                                case 'cafes':
                                    setCurrentImage(coffee1);
                                    break;
                                case 'sobremesas':
                                    setCurrentImage(coffee2);
                                    break;
                                case 'especiais':
                                    setCurrentImage(coffee3);
                                    break;
                                case 'bebidas-geladas':
                                    setCurrentImage(coffee4);
                                    break;
                                case 'chas':
                                    setCurrentImage(coffee5);
                                    break;
                                default:
                                    setCurrentImage(coffee1);
                            }
                        }}
                    >
                        <Tab eventKey="cafes" title="Cafés ☕">
                            <ul className="menu-list">
                                {menuItems.cafes.map((item) => (
                                    <li key={item.id}>
                                        {item.name} <span>R$ {item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="sobremesas" title="Sobremesas 🍰">
                            <ul className="menu-list">
                                {menuItems.sobremesas.map((item) => (
                                    <li key={item.id}>
                                        {item.name} <span>R$ {item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="especiais" title="Especiais 🎵">
                            <ul className="menu-list">
                                {menuItems.especiais.map((item) => (
                                    <li key={item.id}>
                                        {item.name} <span>R$ {item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="bebidas-geladas" title="Bebidas Geladas 🥤">
                            <ul className="menu-list">
                                {menuItems.bebidasGeladas.map((item) => (
                                    <li key={item.id}>
                                        {item.name} <span>R$ {item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="chas" title="Chás 🍵">
                            <ul className="menu-list">
                                {menuItems.chas.map((item) => (
                                    <li key={item.id}>
                                        {item.name} <span>R$ {item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Menu;
