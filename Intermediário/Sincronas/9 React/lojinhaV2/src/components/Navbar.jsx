import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Ícones do FontAwesome
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';


function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">Valeu Store</Link>
          <input type="text" placeholder="Buscar produtos..." className="search-bar" />
        </div>
        
        <div className="navbar-right">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart size={22} />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </Link>
          <Link to="/profile" className="user-icon">
            <FaUser size={22} />
          </Link>
        </div>
      </nav>
    );
  }
  
  export default Navbar;