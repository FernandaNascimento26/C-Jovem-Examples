import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css';

function Navbar({ onSearch }) { // Recebe a função `onSearch` da Home
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query); // Envia a busca para a Home
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
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={22} />
        </Link>
        <Link to="/profile" className="user-icon">
          <FaUser size={22} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
