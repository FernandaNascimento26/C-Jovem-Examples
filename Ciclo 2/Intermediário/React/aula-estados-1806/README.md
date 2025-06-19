# Guia: useState e useEffect para Iniciantes

## Entendendo useState - A "memória" do componente

### localStorage vs useState
Vamos comparar com algo que você já conhece - o `localStorage`:

| localStorage               | useState                     |
|----------------------------|------------------------------|
| Guarda dados no navegador   | Guarda dados só enquanto a página está aberta |
| Permanece após fechar o site | Some quando você atualiza a página |
| Precamos pegar com `getItem`| Já está disponível na variável |
| Salvar com `setItem`        | Atualizar com a função `set` |

### Exemplo Prático - Carrinho de Compras

```javascript
import { useState } from 'react';

function Carrinho() {
  // Criamos uma "caixinha" para guardar itens
  const [itens, setItens] = useState([]);
  
  // Função para adicionar um item
  const adicionarItem = (novoItem) => {
    setItens([...itens, novoItem]); // Copia os itens antigos e adiciona o novo
  };

  return (
    <div>
      <h2>Seu Carrinho ({itens.length} itens)</h2>
      <button onClick={() => adicionarItem('Maçã')}>
        Adicionar Maçã
      </button>
    </div>
  );
}
```

## Entendendo useEffect - O "faz-tudo" do componente

### Comparando com eventos do dia-a-dia
Pense no `useEffect` como um assistente que:

1. **Prepara coisas** quando você chega (montagem do componente)
2. **Limpa tudo** quando você sai (desmontagem)
3. **Reage** quando algo específico muda

### Exemplo Prático - Relógio e Limpeza

```javascript
import { useState, useEffect } from 'react';

function Relogio() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // 1. Quando o componente aparece, inicia o relógio
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    // 2. Função de limpeza - quando o componente some
    return () => {
      clearInterval(intervalo); // Para o relógio
      console.log('Relógio parado!');
    };
  }, []); // 3. Array vazio = só executa uma vez

  return <div>Hora atual: {hora}</div>;
}
```

## Juntando Tudo - Exemplo Completo

```javascript
function ContadorComHistorico() {
  const [contador, setContador] = useState(0);
  const [historico, setHistorico] = useState([]);

  // Toda vez que o contador muda, guarda no histórico
  useEffect(() => {
    setHistorico([...historico, contador]);
    
    // BONUS: Também salva no localStorage
    localStorage.setItem('ultimoContador', contador);
  }, [contador]); // Só executa quando contador muda

  return (
    <div>
      <p>Contagem: {contador}</p>
      <button onClick={() => setContador(c => c + 1)}>
        Aumentar
      </button>
      <p>Histórico: {historico.join(', ')}</p>
    </div>
  );
}
```

## Dicas para Não Se Confundir

1. **useState** é como uma caixinha onde você guarda coisas que, quando mudam, fazem sua tela atualizar.

2. **useEffect** tem três momentos principais:
   - Faz algo quando o componente aparece
   - Limpa quando o componente some
   - Observa quando variáveis específicas mudam

3. **Diferença chave**:
   - `useState` = GUARDA informação
   - `useEffect` = FAZ algo quando algo acontece

