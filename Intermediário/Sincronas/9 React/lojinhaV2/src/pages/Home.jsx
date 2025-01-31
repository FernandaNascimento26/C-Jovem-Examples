import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import StarRating from '../components/StarRating';
import './styles/Home.css';
import productsData from '../data/products.json';

function Home({ searchTerm }) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Filtrar produtos conforme a busca
  const filteredProducts = products.filter((product) =>
    searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div>
      <h1 className="page-title">Bem Vindos</h1>
      <p className="page-description">Confira nossos produtos:</p>
      <div className="products-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">Preço: R$ {product.price}</p>

              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Adicionar ao Carrinho
              </button>

               {/* Componente de avaliação por estrelas */}
               <StarRating productId={product.id} />
            </div>
          ))
        ) : (
          <p className="no-results">Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
}

export default Home;
