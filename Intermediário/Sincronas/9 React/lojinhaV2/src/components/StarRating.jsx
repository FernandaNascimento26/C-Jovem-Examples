import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './StarRating.css';

function StarRating({ productId }) {
  const [ratings, setRatings] = useState([]); // Lista de avaliações
  const [averageRating, setAverageRating] = useState(0); // Média das avaliações

  // Carrega as avaliações do LocalStorage ao montar o componente
  useEffect(() => {
    const savedRatings = localStorage.getItem(`product-ratings-${productId}`);
    if (savedRatings) {
      const parsedRatings = JSON.parse(savedRatings);
      setRatings(parsedRatings);
      calculateAverage(parsedRatings);
    }
  }, [productId]);

  // Função para calcular a média das avaliações
  const calculateAverage = (ratingsList) => {
    if (ratingsList.length === 0) {
      setAverageRating(0);
    } else {
      const total = ratingsList.reduce((sum, rating) => sum + rating, 0);
      setAverageRating(total / ratingsList.length);
    }
  };

  // Adicionar nova avaliação
  const handleRating = (newRating) => {
    const updatedRatings = [...ratings, newRating]; // Adiciona a nova avaliação
    setRatings(updatedRatings);
    localStorage.setItem(`product-ratings-${productId}`, JSON.stringify(updatedRatings));
    calculateAverage(updatedRatings);
  };

  return (
    <div className="star-rating">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            className={star <= averageRating ? 'star selected' : 'star'}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>
      <p className="rating-info">
        Média: <strong>{averageRating.toFixed(1)}</strong> ({ratings.length} avaliações)
      </p>
    </div>
  );
}

// Validação das props
StarRating.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default StarRating;
