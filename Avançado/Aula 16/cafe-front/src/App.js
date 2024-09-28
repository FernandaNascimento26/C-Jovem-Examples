import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Stories from './components/Stories';
import Contact from './components/Contact';
import Menu from './components/Menu';
import OrderPage from './components/OrderPage';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/sobre-nos" element={<About />} /> 
                <Route path="/menu" element={<Menu />} />
                <Route path="/pedidos" element={<OrderPage />} />
                <Route path="/historias" element={<Stories />} />  
                <Route path="/contato" element={<Contact />} />  
                <Route path="*" element={<NotFound />} /> 
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
