let x = document.querySelector('.x');
let o = document.querySelector('.o');
let boxes = document.querySelectorAll('.box');
let buttons = document.querySelectorAll('#buttons-container button');
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

// contador de jogadas
let player1 = 0;
let player2 = 0;

// adicionando o evento de click a todos as caixas
for(let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function() {
    let el = checkEl(player1, player2);
    
    // verificando se ja tem um elemento
    if(this.childNodes.length == 0) {
      let cloneEl = el.cloneNode(true);
      this.appendChild(cloneEl);

      // computa a jogada
      if(player1 == player2) {
        player1++;
        
        // jogada da IA
        if(secondPlayer == 'ai-player' && !checkWinCondition()) {
          setTimeout(() => {
            computerPlay();
            player2++;
            checkWinCondition();
          }, 500);
        }
      } else {
        player2++;
      }

      checkWinCondition();
    }
  });  
}

// ve quem está jogando
function checkEl(player1, player2) {
  return player1 == player2 ? x : o;
}

// checa quem venceu
function checkWinCondition() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];

  // Verifica todas as combinações
  for(let combo of winningCombinations) {
    const [a, b, c] = combo;
    const boxA = boxes[a].childNodes[0]?.className;
    const boxB = boxes[b].childNodes[0]?.className;
    const boxC = boxes[c].childNodes[0]?.className;

    if(boxA && boxA === boxB && boxB === boxC) {
      declareWinner(boxA);
      return true;
    }
  }

  // Verifica empate
  let filledBoxes = 0;
  for(let i = 0; i < boxes.length; i++) {
    if(boxes[i].childNodes.length > 0) filledBoxes++;
  }

  if(filledBoxes === 9) {
    declareWinner('draw');
    return true;
  }

  return false;
}

// IA inteligente
function computerPlay() {
  // 1. Verifica se pode vencer
  let winningMove = findWinningMove('o');
  if(winningMove) {
    winningMove.appendChild(o.cloneNode(true));
    return;
  }

  // 2. Verifica se precisa bloquear
  let blockingMove = findWinningMove('x');
  if(blockingMove) {
    blockingMove.appendChild(o.cloneNode(true));
    return;
  }

  // 3. Estratégia de jogada
  makeStrategicMove();
}

function findWinningMove(playerClass) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];

  for(let combo of winningCombinations) {
    const [a, b, c] = combo;
    const boxesArray = Array.from(boxes);
    
    // Conta quantas posições estão marcadas com o símbolo do jogador
    let count = 0;
    let emptyIndex = null;
    
    if(boxesArray[a].childNodes[0]?.className === playerClass) count++;
    else if(!boxesArray[a].childNodes[0]) emptyIndex = a;
    
    if(boxesArray[b].childNodes[0]?.className === playerClass) count++;
    else if(!boxesArray[b].childNodes[0]) emptyIndex = b;
    
    if(boxesArray[c].childNodes[0]?.className === playerClass) count++;
    else if(!boxesArray[c].childNodes[0]) emptyIndex = c;
    
    if(count === 2 && emptyIndex !== null) {
      return boxesArray[emptyIndex];
    }
  }
  
  return null;
}

function makeStrategicMove() {
  const priorityOrder = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // Centro, cantos, depois bordas
  const boxesArray = Array.from(boxes);
  
  for(let i of priorityOrder) {
    if(!boxesArray[i].childNodes[0]) {
      boxesArray[i].appendChild(o.cloneNode(true));
      return;
    }
  }
}

// limpa o jogo e atualiza placar
function declareWinner(winner) {
  let scoreboardX = document.querySelector("#scoreboard-1");
  let scoreboardO = document.querySelector("#scoreboard-2");
  let msg = '';

  if(winner === 'x') {
    scoreboardX.textContent = parseInt(scoreboardX.textContent) + 1;
    msg = "Jogador 1 (X) venceu!";
  } else if(winner === 'o') {
    scoreboardO.textContent = parseInt(scoreboardO.textContent) + 1;
    msg = secondPlayer === 'ai-player' ? "A IA (O) venceu!" : "Jogador 2 (O) venceu!";
  } else {
    msg = "Empate!";
  }

  // exibe mensagem
  messageText.textContent = msg;
  messageContainer.classList.remove("hide");

  // esconde mensagem após 3 segundos
  setTimeout(() => {
    messageContainer.classList.add("hide");
  }, 3000);

  // reseta o jogo
  resetGame();
}

function resetGame() {
  player1 = 0;
  player2 = 0;
  
  // limpa o tabuleiro
  boxes.forEach(box => {
    while(box.firstChild) {
      box.removeChild(box.firstChild);
    }
  });
}

// seleção de modo de jogo
for(let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    secondPlayer = this.id;
    
    buttons.forEach(btn => btn.style.display = 'none');
    
    setTimeout(() => {
      document.querySelector("#container").classList.remove("hide");
    }, 500);
  });
}