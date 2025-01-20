import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Criar o contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Adicionar produto ao carrinho
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Se o produto já está no carrinho, aumenta a quantidade
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      }

      // Caso contrário, adiciona o produto com quantidade inicial 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Aumentar a quantidade de um produto no carrinho
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Diminuir a quantidade de um produto no carrinho (mínimo 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remover produto do carrinho
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular o valor total do carrinho
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

// Validação das props
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
