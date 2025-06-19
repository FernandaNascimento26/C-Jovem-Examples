
const carrinho = [];

// Função para atualizar a tabela do carrinho
const atualizarTabelaCarrinho = async () => {
    const tabelaCarrinho = document.getElementById('tabelaCarrinho');
    const totalCarrinho = document.getElementById('totalCarrinho');

    tabelaCarrinho.innerHTML = '';
    let total = 0;

    carrinho.forEach(({ nome, quantidade, preco }, indice) => {
        const subtotal = quantidade * preco;
        total += subtotal;

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${nome}</td>
            <td>
                <button class="btn-quantidade" onclick="alterarQuantidade(${indice}, -1)">-</button>
                ${quantidade}
                <button class="btn-quantidade" onclick="alterarQuantidade(${indice}, 1)">+</button>
            </td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>R$ ${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-lixeira" onclick="removerItem(${indice})">
                    <img src="https://img.icons8.com/ios-glyphs/30/ff4dff/trash.png" alt="Remover">
                </button>
            </td>
        `;
        tabelaCarrinho.appendChild(linha);
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
};

// Função para adicionar item ao carrinho
const adicionarItem = async (event) => {
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
    await atualizarTabelaCarrinho();
};

// Função para alterar quantidade de um item (incrementar ou decrementar)
const alterarQuantidade = async (indice, delta) => {
    if (carrinho[indice].quantidade + delta > 0) {
        carrinho[indice].quantidade += delta;
    } else {
        carrinho.splice(indice, 1); // Remove o item se a quantidade for zero
    }
    await atualizarTabelaCarrinho();
};

// Função para remover item do carrinho
const removerItem = async (indice) => {
    carrinho.splice(indice, 1);
    await atualizarTabelaCarrinho();
};

// Função para aplicar desconto
const aplicarDesconto = async (event) => {
    event.preventDefault();

    const codigoDesconto = document.getElementById('codigoDesconto').value;
    const descontos = {
        'DESC10': 0.10,
        'DESC20': 0.20
    };

    const desconto = descontos[codigoDesconto];

    if (!desconto) {
        alert('Código de desconto inválido.');
        return;
    }

    const totalElement = document.getElementById('totalCarrinho');
    const totalAtual = parseFloat(totalElement.textContent.replace('Total: R$ ', '').replace(',', '.'));
    const novoTotal = totalAtual * (1 - desconto);

    totalElement.textContent = `Total: R$ ${novoTotal.toFixed(2)}`;
    alert(`Desconto de ${(desconto * 100).toFixed(0)}% aplicado!`);
    document.getElementById('formDesconto').reset();
};

// Eventos do formulário
document.getElementById('formItem').addEventListener('submit', adicionarItem);
document.getElementById('formDesconto').addEventListener('submit', aplicarDesconto);s