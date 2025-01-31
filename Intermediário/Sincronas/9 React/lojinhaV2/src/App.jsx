import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado global da busca

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onSearch={setSearchTerm} /> {/* Passa a função para a Navbar */}
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} /> {/* Passa a busca para a Home */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
