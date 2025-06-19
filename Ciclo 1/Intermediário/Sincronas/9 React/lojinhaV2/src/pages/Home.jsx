import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import StarRating from '../components/StarRating';
import './styles/Home.css';
import productsData from '../data/products.json';

function Home({ searchFilters }) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  // Verifica se os filtros estão vazios
  const isFilterEmpty = Object.values(searchFilters).every((val) => val === '' || val === undefined);

  // Se não há filtros, exibe todos os produtos
  const filteredProducts = isFilterEmpty
    ? products
    : products.filter((product) => {
        const { name, minPrice, maxPrice, minStars } = searchFilters;

        if (name && !product.name.toLowerCase().includes(name.toLowerCase())) return false;
        if (minPrice && product.price < Number(minPrice)) return false;
        if (maxPrice && product.price > Number(maxPrice)) return false;

        // Calculando média de estrelas pelo localStorage
        const savedRatings = localStorage.getItem(`product-ratings-${product.id}`);
        const ratings = savedRatings ? JSON.parse(savedRatings) : [];
        const averageRating = ratings.length > 0
          ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          : 0;

        if (minStars && averageRating < Number(minStars)) return false;

        return true;
      });

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
              <StarRating productId={product.id} />
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Adicionar ao Carrinho
              </button>
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
