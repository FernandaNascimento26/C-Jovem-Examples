const carrinho = [];

// Atualiza a tabela do carrinho
function atualizarTabelaCarrinho() {
    const tabelaCarrinho = document.getElementById('tabelaCarrinho');
    const totalCarrinho = document.getElementById('totalCarrinho');

    tabelaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, indice) => {
        const subtotal = item.quantidade * item.preco;
        total += subtotal;

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td><button onclick="removerItem(${indice})">Remover</button></td>
        `;
        tabelaCarrinho.appendChild(linha);
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adiciona item ao carrinho
function adicionarItem(event) {
    event.preventDefault();

    const nomeItem = document.getElementById('nomeItem').value;
    const quantidadeItem = parseInt(document.getElementById('quantidadeItem').value);
    const precoItem = parseFloat(document.getElementById('precoItem').value);

    const itemExistente = carrinho.find(item => item.nome === nomeItem);
    if (itemExistente) {
        itemExistente.quantidade += quantidadeItem;
    } else {
        carrinho.push({ nome: nomeItem, quantidade: quantidadeItem, preco: precoItem });
    }

    document.getElementById('formItem').reset();
    atualizarTabelaCarrinho();
}

// Remove item do carrinho
function removerItem(indice) {
    carrinho.splice(indice, 1);
    atualizarTabelaCarrinho();
}

// Aplica desconto
function aplicarDesconto(event) {
    event.preventDefault();

    const codigoDesconto = document.getElementById('codigoDesconto').value;
    let desconto = 0;

    if (codigoDesconto === 'DESC10') {
        desconto = 0.10;
    } else if (codigoDesconto === 'DESC20') {
        desconto = 0.20;
    } else {
        alert('Código de desconto inválido.');
        return;
    }

    const totalElement = document.getElementById('totalCarrinho');
    const totalAtual = parseFloat(totalElement.textContent.replace('Total: R$ ', '').replace(',', '.'));
    const novoTotal = totalAtual * (1 - desconto);

    totalElement.textContent = `Total: R$ ${novoTotal.toFixed(2)}`;
    alert(`Desconto de ${desconto * 100}% aplicado!`);
    document.getElementById('formDesconto').reset();
}

document.getElementById('formItem').addEventListener('submit', adicionarItem);
document.getElementById('formDesconto').addEventListener('submit', aplicarDesconto);
