# Guia de Integração Frontend (React) com Backend usando Axios

Este guia explica como integrar um frontend React (com Create React App ou Vite) com um backend usando Axios e variáveis de ambiente. A documentação inclui exemplos para ambos os frameworks e destaca a necessidade de adaptar a porta do backend.

---

## **Passo 1: Configurar Variáveis de Ambiente**

### **Create React App (CRA)**
1. Crie um arquivo `.env` na raiz do projeto frontend.
2. Adicione a URL do backend como uma variável de ambiente:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```
   - **`REACT_APP_`:** Prefixo obrigatório para variáveis de ambiente no CRA.
   - **URL:** Substitua `http://localhost:3001` pela URL do seu backend (ajuste a porta conforme necessário).

3. Reinicie o servidor de desenvolvimento após criar/modificar o `.env`.

### **Vite**
1. Crie um arquivo `.env` na raiz do projeto frontend.
2. Adicione a URL do backend como uma variável de ambiente:
   ```env
   VITE_API_URL=http://localhost:3001
   ```
   - **`VITE_`:** Prefixo obrigatório para variáveis de ambiente no Vite.
   - **URL:** Substitua `http://localhost:3001` pela URL do seu backend (ajuste a porta conforme necessário).

3. Reinicie o servidor de desenvolvimento após criar/modificar o `.env`.

---

## **Passo 2: Instalar o Axios**

No terminal, instale o Axios:
```bash
npm install axios
```

---

## **Passo 3: Criar o Serviço de API**

### **Create React App (CRA)**
1. Crie um arquivo `src/services/api.js` para configurar o Axios:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL, // Usa a variável de ambiente
   });

   export default api;
   ```

### **Vite**
1. Crie um arquivo `src/services/api.js` para configurar o Axios:
   ```javascript
   import axios from 'axios';

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL, // Usa a variável de ambiente
   });

   export default api;
   ```

---

## **Passo 4: Criar Serviços Específicos**

1. Crie um arquivo `src/services/nomeDoServico.js` para cada recurso do backend (ex: usuários, produtos, etc.).
2. Exemplo de serviço para buscar dados:
   ```javascript
   import api from './api';

   const buscarDados = async () => {
     try {
       const response = await api.get('/endpoint');
       return response.data;
     } catch (error) {
       console.error("Erro ao buscar dados:", error);
       throw error;
     }
   };

   export default {
     buscarDados,
   };
   ```

3. **Explicação:**
   - `api.get('/endpoint')`: Faz uma requisição GET para o endpoint `/endpoint` do backend.
   - Substitua `/endpoint` pelo caminho correto do seu backend.

---

## **Passo 5: Usar o Serviço no Componente**

1. Importe o serviço no componente onde você deseja usar os dados.
2. Exemplo de uso em um componente React:
   ```javascript
   import React, { useEffect, useState } from 'react';
   import nomeDoServico from './services/nomeDoServico';

   const MeuComponente = () => {
     const [dados, setDados] = useState([]);

     useEffect(() => {
       const carregarDados = async () => {
         try {
           const response = await nomeDoServico.buscarDados();
           setDados(response);
         } catch (error) {
           console.error("Erro ao carregar dados:", error);
         }
       };

       carregarDados();
     }, []);

     return (
       <div>
         <h1>Dados do Backend</h1>
         <ul>
           {dados.map((item) => (
             <li key={item.id}>{item.nome}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default MeuComponente;
   ```

---

## **Passo 6: Entendendo o `useEffect`**

O **`useEffect`** é um hook do React que permite executar efeitos colaterais em componentes funcionais. Ele é usado para:

- Buscar dados de uma API.
- Atualizar o DOM.
- Configurar listeners ou timers.
- Limpar recursos quando o componente é desmontado.

### **Sintaxe Básica**
```javascript
useEffect(() => {
  // Código a ser executado (efeito colateral)
  return () => {
    // Código de limpeza (opcional)
  };
}, [dependencias]);
```

### **Explicação Detalhada**
1. **Executar um Efeito Uma Vez (Montagem do Componente):**
   ```javascript
   useEffect(() => {
     console.log("Componente montado!");
   }, []);
   ```
   - **Quando é executado:** Apenas na montagem do componente.
   - **Uso comum:** Buscar dados de uma API ao carregar o componente.

2. **Executar um Efeito Sempre que uma Dependência Mudar:**
   ```javascript
   const [contador, setContador] = useState(0);

   useEffect(() => {
     console.log("Contador mudou:", contador);
   }, [contador]);
   ```
   - **Quando é executado:** Sempre que o valor de `contador` mudar.
   - **Uso comum:** Atualizar o DOM ou fazer requisições com base em mudanças de estado.

3. **Executar um Efeito Sempre que o Componente Renderizar:**
   ```javascript
   useEffect(() => {
     console.log("Componente renderizado!");
   });
   ```
   - **Quando é executado:** Após cada renderização do componente.
   - **Cuidado:** Isso pode causar problemas de desempenho se o efeito for pesado.

4. **Limpeza de Efeitos:**
   ```javascript
   useEffect(() => {
     const timer = setInterval(() => {
       console.log("Timer executando...");
     }, 1000);

     return () => {
       clearInterval(timer); // Limpa o timer quando o componente é desmontado
     };
   }, []);
   ```
   - **Quando é executado:** Antes de o componente ser desmontado ou antes de o efeito ser reexecutado.
   - **Uso comum:** Limpar recursos como timers, listeners ou cancelar requisições.

---

## **Passo 7: Configurar o Backend**

1. Certifique-se de que o backend está rodando e acessível na URL definida no `.env`.
2. Configure o CORS no backend para permitir requisições do frontend:
   - **Exemplo com Express (Node.js):**
     ```javascript
     const express = require('express');
     const cors = require('cors');

     const app = express();

     app.use(cors({
       origin: 'http://localhost:3000', // Permite requisições do frontend
       methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
     }));

     app.get('/endpoint', (req, res) => {
       res.json([{ id: 1, nome: 'Exemplo' }]);
     });

     const PORT = 3001; // Ajuste a porta conforme necessário
     app.listen(PORT, () => {
       console.log(`Servidor rodando na porta ${PORT}`);
     });
     ```

---

## **Passo 8: Testar a Integração**

1. Inicie o backend e o frontend.
2. Verifique se as requisições estão sendo feitas corretamente:
   - Abra o console do navegador (F12) e verifique as requisições na aba "Network".
   - Certifique-se de que os dados estão sendo carregados no frontend.

---

## **Passo 9: Configurar para Produção**

1. No ambiente de produção, atualize o `.env` com a URL do backend hospedado:
   - **Create React App (CRA):**
     ```env
     REACT_APP_API_URL=https://api.meubackend.com
     ```
   - **Vite:**
     ```env
     VITE_API_URL=https://api.meubackend.com
     ```

2. Faça o build do frontend:
   ```bash
   npm run build
   ```

3. Sirva os arquivos do build usando um servidor HTTP (ex: Nginx, Apache, ou um serviço como Vercel/Netlify).

---

## **Passo 10: Ignorar o `.env` no Versionamento**

Adicione o `.env` ao `.gitignore` para evitar que informações sensíveis sejam commitadas:
```gitignore
# Ignorar arquivos de ambiente
.env
```

---

## **Resumo**

1. **Variáveis de Ambiente:** Use `.env` para configurar a URL do backend.
   - **CRA:** Prefixo `REACT_APP_`.
   - **Vite:** Prefixo `VITE_`.
2. **Axios:** Crie um serviço centralizado para fazer requisições à API.
3. **`useEffect`:** Use para buscar dados, atualizar o DOM ou gerenciar efeitos colaterais.
4. **CORS:** Configure o backend para permitir requisições do frontend.
5. **Testes:** Verifique se as requisições estão funcionando no console do navegador.
6. **Produção:** Atualize o `.env` com a URL do backend hospedado e faça o build do frontend.

---

**Importante:**  
- **Adapte a porta do backend** conforme necessário. Por exemplo, se o backend estiver rodando na porta `4000`, atualize o `.env`:
  ```env
  REACT_APP_API_URL=http://localhost:4000  # CRA
  VITE_API_URL=http://localhost:4000       # Vite
  ```