import { useState } from 'react';
import './styles.css';

function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [nomeItem, setNomeItem] = useState('');
  const [quantidadeItem, setQuantidadeItem] = useState(1);
  const [precoItem, setPrecoItem] = useState(0);
  const [codigoDesconto, setCodigoDesconto] = useState('');
  const [total, setTotal] = useState(0);

  const atualizarTotal = (novoCarrinho) => {
    const novoTotal = novoCarrinho.reduce(
      (acc, item) => acc + item.quantidade * item.preco,
      0
    );
    setTotal(novoTotal);
  };

  const adicionarItem = (e) => {
    e.preventDefault();

    const itemExistente = carrinho.find((item) => item.nome === nomeItem);
    let novoCarrinho;

    if (itemExistente) {
      novoCarrinho = carrinho.map((item) =>
        item.nome === nomeItem
          ? { ...item, quantidade: item.quantidade + quantidadeItem }
          : item
      );
    } else {
      novoCarrinho = [
        ...carrinho,
        { nome: nomeItem, quantidade: quantidadeItem, preco: precoItem },
      ];
    }

    setCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
    setNomeItem('');
    setQuantidadeItem(1);
    setPrecoItem(0);
  };

  const removerItem = (index) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
  };

  const aumentarQuantidade = (index) => {
    const novoCarrinho = carrinho.map((item, i) =>
      i === index ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    setCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
  };

  const diminuirQuantidade = (index) => {
    const novoCarrinho = carrinho.map((item, i) =>
      i === index && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setCarrinho(novoCarrinho);
    atualizarTotal(novoCarrinho);
  };

  const aplicarDesconto = (e) => {
    e.preventDefault();

    let desconto = 0;
    if (codigoDesconto === 'DESC10') {
      desconto = 0.1;
    } else if (codigoDesconto === 'DESC20') {
      desconto = 0.2;
    } else {
      alert('Código de desconto inválido.');
      return;
    }

    const novoTotal = total * (1 - desconto);
    setTotal(novoTotal);
    alert(`Desconto de ${desconto * 100}% aplicado!`);
    setCodigoDesconto('');
  };

  return (
    <div className="expanded-container">
      <h1>Gerenciador de Carrinho</h1>
      <div className="form-wrapper">
        <form onSubmit={adicionarItem} className="form-item">
          <label>Nome do Produto:</label>
          <input
            type="text"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
            placeholder="Nome do produto"
            required
          />
          <label>Quantidade:</label>
          <input
            type="number"
            value={quantidadeItem}
            onChange={(e) => setQuantidadeItem(parseInt(e.target.value))}
            required
            min="1"
          />
          <label>Preço Unitário:</label>
          <input
            type="number"
            value={precoItem}
            onChange={(e) => setPrecoItem(parseFloat(e.target.value))}
            required
            min="0.01"
            step="0.01"
          />
          <button type="submit">Adicionar</button>
        </form>
        <form onSubmit={aplicarDesconto} className="form-desconto">
          <input
            type="text"
            value={codigoDesconto}
            onChange={(e) => setCodigoDesconto(e.target.value)}
            placeholder="Código de desconto"
          />
          <button type="submit">Aplicar Desconto</button>
        </form>
      </div>
      <table className="expanded-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço Unitário</th>
            <th>Subtotal</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item, index) => (
            <tr key={index}>
              <td>{item.nome}</td>
              <td>
                <button onClick={() => diminuirQuantidade(index)}>-</button>
                {item.quantidade}
                <button onClick={() => aumentarQuantidade(index)}>+</button>
              </td>
              <td>R$ {item.preco.toFixed(2)}</td>
              <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => removerItem(index)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total">Total: R$ {total.toFixed(2)}</div>
    </div>
  );
}

export default Carrinho;
