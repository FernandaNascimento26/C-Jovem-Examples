// Tela inicial - nome
// Seleciona elementos da tela inicial onde o usuário digita seu nome
const telaNome = document.getElementById('tela-nome');
const inputNome = document.getElementById('input-nome');
const btnEntrar = document.getElementById('btn-entrar');
const container = document.getElementById('container');
const mensagemNome = document.getElementById('mensagem-nome');

let nomeUsuario = ''; // Variável para armazenar o nome do usuário

// Evento de clique no botão de entrar
btnEntrar.onclick = () => {
  const nome = inputNome.value.trim(); // Obtém e remove espaços em branco do nome
  if(nome.length < 2) { // Validação mínima do nome
    alert("Por favor, digite um nome válido.");
    inputNome.focus(); // Foca novamente no input
    return;
  }
  nomeUsuario = nome; // Armazena o nome
  telaNome.classList.add('hidden'); // Esconde a tela de nome
  container.classList.remove('hidden'); // Mostra o container principal
  mensagemNome.textContent = `Olá, ${nomeUsuario}! Use o botão abaixo se precisar atravessar.`;
};

// Semáforo
// Seleciona elementos do semáforo e componentes relacionados
const luzVermelha = document.getElementById('luz-vermelha');
const luzAmarela = document.getElementById('luz-amarela');
const luzVerde = document.getElementById('luz-verde');
const pedestreBtn = document.getElementById('pedestre-btn');
const status = document.getElementById('status');
const contador = document.getElementById('contador');
const audioTroca = document.getElementById('audio-troca');

// Variáveis de estado do semáforo
let estado = "verde"; // Pode ser: verde, amarelo, vermelho, pedestre
let tempoRestante = 10; // Tempo restante para mudança de estado
let intervalo = null; // Referência para o intervalo do temporizador
let pedestreEsperando = false; // Flag para indicar se há pedestre esperando

// Função para atualizar o estado do semáforo
function atualizaSemaforo(novoEstado, tempo) {
  estado = novoEstado;
  tempoRestante = tempo;
  // Desliga todas as luzes
  luzVermelha.classList.remove('on');
  luzAmarela.classList.remove('on');
  luzVerde.classList.remove('on');
  
  // Toca som de troca de estado
  audioTroca.currentTime = 0;
  audioTroca.play();
  
  // Configura o estado atual do semáforo
  if(estado === "verde") {
    luzVerde.classList.add('on'); // Acende verde
    status.textContent = "Status: Carros em movimento";
    pedestreBtn.disabled = false; // Habilita botão do pedestre
  } else if(estado === "amarelo") {
    luzAmarela.classList.add('on'); // Acende amarelo
    status.textContent = "Status: Atenção! Vai fechar";
    pedestreBtn.disabled = true; // Desabilita botão do pedestre
  } else if(estado === "vermelho") {
    luzVermelha.classList.add('on'); // Acende vermelho
    status.textContent = `Status: Carros parados. ${nomeUsuario}, atravesse!`;
    pedestreBtn.disabled = true; // Desabilita botão do pedestre
  }
  contador.textContent = `Tempo: ${tempoRestante}s`; // Atualiza contador
}

// Função principal que controla o ciclo do semáforo
function cicloSemaforo() {
  clearInterval(intervalo); // Limpa qualquer intervalo existente
  
  if(estado === "verde") {
    atualizaSemaforo("verde", 10);
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        atualizaSemaforo("amarelo", 3); // Muda para amarelo após 10s
        cicloSemaforo();
      }
    }, 1000);
  } else if(estado === "amarelo") {
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        atualizaSemaforo("vermelho", pedestreEsperando ? 8 : 5); // Muda para vermelho (mais tempo se pedestre esperando)
        cicloSemaforo();
      }
    }, 1000);
  } else if(estado === "vermelho") {
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        pedestreEsperando = false; // Reseta flag do pedestre
        atualizaSemaforo("verde", 10); // Volta para verde
        cicloSemaforo();
      }
    }, 1000);
  }
}

// Evento do botão do pedestre
pedestreBtn.onclick = () => {
  if(estado === "verde" || estado === "amarelo") {
    pedestreEsperando = true; // Indica que há pedestre esperando
    status.textContent = `Status: Pedido de travessia feito! Aguarde o sinal vermelho, ${nomeUsuario}.`;
    pedestreBtn.disabled = true; // Desabilita o botão
  }
};

// Função de inicialização
function iniciar() {
  atualizaSemaforo("verde", 10); // Começa com verde
  cicloSemaforo(); // Inicia o ciclo
}

// Inicia quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", iniciar);