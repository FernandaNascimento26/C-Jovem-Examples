function iniciarToDoList() {
    const botaoAdicionar = document.getElementById('adicionar');
    const lista = document.getElementById('lista');
  
    botaoAdicionar.addEventListener('click', () => {
      const inputTarefa = document.getElementById('tarefa');
      const texto = inputTarefa.value.trim();
  
      if (texto === '') {
        alert('Por favor, insira uma tarefa!');
        return;
      }
  
      const novaTarefa = document.createElement('li');
      novaTarefa.textContent = texto;
  
      const botaoRemover = document.createElement('button');
      botaoRemover.textContent = 'X';
      botaoRemover.classList.add('remove');
      botaoRemover.addEventListener('click', () => {
        lista.removeChild(novaTarefa);
      });
  
      novaTarefa.appendChild(botaoRemover);
      novaTarefa.addEventListener('click', () => {
        novaTarefa.classList.toggle('completed');
      });
  
      lista.appendChild(novaTarefa);
      inputTarefa.value = '';
    });
  }
  