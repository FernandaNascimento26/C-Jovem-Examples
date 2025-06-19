// --- Seletores da tela inicial (nome do usuário) ---
const telaNome = document.getElementById('tela-nome');
const inputNome = document.getElementById('input-nome');
const btnEntrar = document.getElementById('btn-entrar');
const container = document.getElementById('container');
const mensagemNome = document.getElementById('mensagem-nome');

// Variável para guardar o nome digitado
let nomeUsuario = '';

// --- Evento do botão "Entrar" ---
btnEntrar.onclick = () => {
  const nome = inputNome.value.trim(); // Remove espaços antes e depois
  if(nome.length < 2) {
    alert("Por favor, digite um nome válido.");
    inputNome.focus(); // Coloca o cursor de volta no campo
    return; // Interrompe a função se o nome for inválido
  }
  nomeUsuario = nome;
  telaNome.classList.add('hidden'); // Esconde tela de nome
  container.classList.remove('hidden'); // Mostra lista principal
  mensagemNome.textContent = `Olá, ${nomeUsuario}! Monte sua lista de compras abaixo.`;
};

// --- Seletores e variáveis da lista de compras ---
const listaCompras = document.getElementById('lista-compras');
const novoItemInput = document.getElementById('novo-item');
const btnAdicionar = document.getElementById('btn-adicionar');
const contador = document.getElementById('contador');

// Array para armazenar os itens (objeto: nome + comprado)
let itens = [];

// --- Função para adicionar item novo ---
btnAdicionar.onclick = adicionarItem;
// Também permite adicionar ao pressionar Enter no input
novoItemInput.addEventListener('keyup', e => { if(e.key === 'Enter') adicionarItem(); });

function adicionarItem() {
  const nome = novoItemInput.value.trim();
  if(nome.length < 2) {
    novoItemInput.focus(); // Foca o campo se o nome for curto ou vazio
    return;
  }
  // Adiciona o novo item ao array
  itens.push({ nome, comprado: false });
  novoItemInput.value = ""; // Limpa o campo
  renderizarLista(); // Atualiza a lista na tela
}

// --- Função que desenha (renderiza) a lista de compras ---
function renderizarLista() {
  listaCompras.innerHTML = ''; // Limpa o conteúdo atual
  itens.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'item' + (item.comprado ? ' comprado' : '');
    li.setAttribute('draggable', true); // Torna o item arrastável
    li.setAttribute('data-idx', idx);

    // --- Botão de marcar/desmarcar comprado ---
    const btnCheck = document.createElement('button');
    btnCheck.className = 'btn-check';
    btnCheck.title = item.comprado ? 'Desmarcar' : 'Marcar como comprado';
    btnCheck.onclick = () => {
      item.comprado = !item.comprado; // Inverte o status
      renderizarLista(); // Atualiza a lista
    };
    li.appendChild(btnCheck);

    // --- Nome do item ---
    const nomeSpan = document.createElement('span');
    nomeSpan.className = 'nome-item';
    nomeSpan.textContent = item.nome;
    li.appendChild(nomeSpan);

    // --- Botão de remover ---
    const btnRemover = document.createElement('button');
    btnRemover.className = 'btn-remover';
    btnRemover.title = 'Remover';
    btnRemover.innerHTML = '&times;'; // X de remover
    btnRemover.onclick = () => {
      itens.splice(idx,1); // Remove o item do array
      renderizarLista();
    };
    li.appendChild(btnRemover);

    // --- Drag and drop (arrastar e soltar) ---
    li.ondragstart = e => {
      li.classList.add('dragging'); // Visual de arrastando
      e.dataTransfer.setData('text/plain', idx); // Guarda o índice original
    };
    li.ondragend = () => li.classList.remove('dragging');
    li.ondragover = e => e.preventDefault(); // Permite arrastar por cima de outros
    li.ondrop = e => {
      e.preventDefault();
      const idxOrigem = +e.dataTransfer.getData('text/plain'); // Pega o índice original
      if(idxOrigem !== idx) {
        // Remove do lugar antigo e insere no novo
        const movido = itens.splice(idxOrigem,1)[0];
        itens.splice(idx, 0, movido);
        renderizarLista();
      }
    };

    listaCompras.appendChild(li);
  });

  atualizarContador();
}

// --- Função que atualiza o contador de itens comprados/total ---
function atualizarContador() {
  const comprados = itens.filter(i => i.comprado).length;
  contador.textContent = `Itens comprados: ${comprados}/${itens.length}`;
}

// --- Mostra a lista ao abrir a página (inicial vazia) ---
renderizarLista();
