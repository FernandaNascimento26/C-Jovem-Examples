// Tela inicial - nome
const telaNome = document.getElementById('tela-nome');
const inputNome = document.getElementById('input-nome');
const btnEntrar = document.getElementById('btn-entrar');
const container = document.getElementById('container');
const mensagemNome = document.getElementById('mensagem-nome');

let nomeUsuario = '';

btnEntrar.onclick = () => {
  const nome = inputNome.value.trim();
  if(nome.length < 2) {
    alert("Por favor, digite um nome válido.");
    inputNome.focus();
    return;
  }
  nomeUsuario = nome;
  telaNome.classList.add('hidden');
  container.classList.remove('hidden');
  mensagemNome.textContent = `Olá, ${nomeUsuario}! Use o botão abaixo se precisar atravessar.`;
};

// Semáforo
const luzVermelha = document.getElementById('luz-vermelha');
const luzAmarela = document.getElementById('luz-amarela');
const luzVerde = document.getElementById('luz-verde');
const pedestreBtn = document.getElementById('pedestre-btn');
const status = document.getElementById('status');
const contador = document.getElementById('contador');
const audioTroca = document.getElementById('audio-troca');

let estado = "verde"; // verde, amarelo, vermelho, pedestre
let tempoRestante = 10;
let intervalo = null;
let pedestreEsperando = false;

function atualizaSemaforo(novoEstado, tempo) {
  estado = novoEstado;
  tempoRestante = tempo;
  luzVermelha.classList.remove('on');
  luzAmarela.classList.remove('on');
  luzVerde.classList.remove('on');
  audioTroca.currentTime = 0;
  audioTroca.play();
  if(estado === "verde") {
    luzVerde.classList.add('on');
    status.textContent = "Status: Carros em movimento";
    pedestreBtn.disabled = false;
  } else if(estado === "amarelo") {
    luzAmarela.classList.add('on');
    status.textContent = "Status: Atenção! Vai fechar";
    pedestreBtn.disabled = true;
  } else if(estado === "vermelho") {
    luzVermelha.classList.add('on');
    status.textContent = `Status: Carros parados. ${nomeUsuario}, atravesse!`;
    pedestreBtn.disabled = true;
  }
  contador.textContent = `Tempo: ${tempoRestante}s`;
}

function cicloSemaforo() {
  clearInterval(intervalo);
  if(estado === "verde") {
    atualizaSemaforo("verde", 10);
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        atualizaSemaforo("amarelo", 3);
        cicloSemaforo();
      }
    }, 1000);
  } else if(estado === "amarelo") {
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        atualizaSemaforo("vermelho", pedestreEsperando ? 8 : 5);
        cicloSemaforo();
      }
    }, 1000);
  } else if(estado === "vermelho") {
    intervalo = setInterval(() => {
      tempoRestante--;
      contador.textContent = `Tempo: ${tempoRestante}s`;
      if(tempoRestante <= 0) {
        pedestreEsperando = false;
        atualizaSemaforo("verde", 10);
        cicloSemaforo();
      }
    }, 1000);
  }
}

pedestreBtn.onclick = () => {
  if(estado === "verde" || estado === "amarelo") {
    pedestreEsperando = true;
    status.textContent = `Status: Pedido de travessia feito! Aguarde o sinal vermelho, ${nomeUsuario}.`;
    pedestreBtn.disabled = true;
  }
};

function iniciar() {
  atualizaSemaforo("verde", 10);
  cicloSemaforo();
}
document.addEventListener("DOMContentLoaded", iniciar);
