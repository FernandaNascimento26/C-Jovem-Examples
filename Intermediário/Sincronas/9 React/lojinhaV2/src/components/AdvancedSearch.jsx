import { useState } from 'react';
import PropTypes from 'prop-types';
import './AdvancedSearch.css';

function AdvancedSearch({ onClose, onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    minPrice: '',
    maxPrice: '',
    minStars: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Aplica os filtros
  const handleSubmit = () => {
    onSearch(filters);
    onClose();
  };

  // Reseta os filtros para exibir todos os produtos
  const handleReset = () => {
    setFilters({ name: '', minPrice: '', maxPrice: '', minStars: '' });
    onSearch({ name: '', minPrice: '', maxPrice: '', minStars: '' }); // Reseta os produtos na Home
    onClose();
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🔎 Busca Avançada</h2>

        <input
          type="text"
          name="name"
          placeholder="Nome do Produto"
          value={filters.name}
          onChange={handleInputChange}
        />
        <div className="price-range">
          <input
            type="number"
            name="minPrice"
            placeholder="Preço Mínimo"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Preço Máximo"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
        <input
          type="number"
          name="minStars"
          placeholder="Mínimo de estrelas (1-5)"
          value={filters.minStars}
          onChange={handleInputChange}
        />

        <div className="modal-actions">
          <button className="apply-btn" onClick={handleSubmit}>Aplicar Filtros</button>
          <button className="reset-btn" onClick={handleReset}>Limpar Filtros</button>
          <button className="close-btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}

AdvancedSearch.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default AdvancedSearch;
