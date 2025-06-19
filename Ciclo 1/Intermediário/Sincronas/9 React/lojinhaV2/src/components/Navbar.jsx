import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import { CartContext } from '../context/CartContext'; // Importa o contexto do carrinho
import AdvancedSearch from './AdvancedSearch';
import './Navbar.css';

function Navbar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { cart } = useContext(CartContext); // Pega o carrinho do contexto

  // Soma todas as quantidades dos produtos no carrinho
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch({ name: query }); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Valeu Store</Link>
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="search-bar"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="advanced-search-btn" onClick={() => setShowSearchModal(true)}>
          🔍 Busca Avançada
        </button>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={22} />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>} {/* Mostra o contador se houver itens */}
        </Link>
        <Link to="/profile" className="user-icon">
          <FaUser size={22} />
        </Link>
      </div>

      {showSearchModal && (
        <AdvancedSearch onClose={() => setShowSearchModal(false)} onSearch={onSearch} />
      )}
    </nav>
  );
}

export default Navbar;
