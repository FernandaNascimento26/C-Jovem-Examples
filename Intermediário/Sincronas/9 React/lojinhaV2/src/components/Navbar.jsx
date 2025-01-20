import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Ícones do FontAwesome

function Navbar() {
    const { cart } = useContext(CartContext);
  
    // Calcula a quantidade total de itens no carrinho
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
          <Link to="/profile" className="user-icon"> {/* Redireciona para a página "Em Construção" */}
            <FaUser size={22} />
          </Link>
        </div>
      </nav>
    );
  }
  
  export default Navbar;