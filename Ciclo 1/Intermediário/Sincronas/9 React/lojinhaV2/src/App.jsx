import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Footer from './components/Footer';

function App() {
  const [searchFilters, setSearchFilters] = useState({});

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar onSearch={setSearchFilters} />
        <Routes>
          <Route path="/" element={<Home searchFilters={searchFilters} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
