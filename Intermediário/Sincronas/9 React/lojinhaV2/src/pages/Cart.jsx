import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa'; // Ícone de lixeira
import './styles/Cart.css';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState('');

  // Aumentar quantidade
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Diminuir quantidade (mínimo 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remover item do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular total com desconto aplicado
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) - discount;

  // Aplicar desconto e exibir alerta
  const applyDiscount = () => {
    if (discountCode === 'VALEU10') {
      setDiscount(total * 0.10);
      alert('Desconto de 10% aplicado com sucesso!');
    } else {
      setDiscount(0);
      alert('Código de desconto inválido!');
    }
    setDiscountCode(''); // Limpa o campo após a tentativa
  };

  return (
    <div className="cart-container">
      <h1>Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Preço: R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="cart-actions">
                <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          <div className="discount-section">
            <input
              type="text"
              placeholder="Código de desconto"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={applyDiscount}>Aplicar</button>
          </div>

          <div className="cart-total">
            <h2>Total: R$ {(total).toFixed(2)}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
