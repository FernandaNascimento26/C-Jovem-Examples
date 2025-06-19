// src/components/Contact.js
import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
    // Definindo estado para capturar os dados do formulário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Definindo estado para capturar mensagens de sucesso ou erro
    const [statusMessage, setStatusMessage] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Fazendo uma requisição POST para o backend
            await axios.post('http://localhost:4000/api/contact', formData);
            setStatusMessage('Mensagem enviada com sucesso!');
            
            // Limpa os campos do formulário após o envio bem-sucedido
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
            setStatusMessage('Erro ao enviar a mensagem. Tente novamente.');
        }
    };

    // Função para lidar com as mudanças nos inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className="contact-section">
            <div className="container">
                <h1>Contato</h1>
                <p>Estamos ansiosos para ouvir você! Entre em contato conosco através dos detalhes abaixo ou envie-nos uma mensagem diretamente pelo formulário.</p>

                <div className="contact-info">
                    <p><strong>Endereço:</strong> 738 Av. Beira Mar, Fortaleza, CE</p>
                    <p><strong>Telefone:</strong> (85) 1234-5678</p>
                    <p><strong>Email:</strong> contato@cafedoamanha.com</p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Mensagem:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <button type="submit">Enviar Mensagem</button>
                </form>

                {/* Exibe uma mensagem de status após o envio */}
                {statusMessage && <p>{statusMessage}</p>}
            </div>
        </section>
    );
}

export default Contact;
