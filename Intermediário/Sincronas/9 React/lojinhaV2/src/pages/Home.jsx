import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import './styles/Home.css';
import productsData from '../data/products.json'; // Importando o JSON

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // Carregar produtos do JSON ao montar o componente
  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div>
      <h1 className="page-title">Bem Vindo</h1>
      <p className="page-description">Confira nossos produtos:</p>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Preço: R$ {product.price}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
