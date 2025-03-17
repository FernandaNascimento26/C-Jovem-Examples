## **Middlewares e Rotas Protegidas**

### **Introdução**
Middlewares são funções que interceptam requisições e respostas em uma aplicação backend. Eles são usados para adicionar lógica adicional ao ciclo de requisição-resposta, como autenticação, validação de dados, logging, etc. Neste guia, vamos focar em como usar middlewares para proteger rotas.

---

### **O que são Middlewares?**

#### **Definição**
Middlewares são funções que têm acesso ao objeto de requisição (`req`), ao objeto de resposta (`res`) e à próxima função no ciclo de requisição-resposta (`next`). Eles podem:
1. Executar código.
2. Modificar os objetos `req` e `res`.
3. Encerrar o ciclo de requisição-resposta.
4. Chamar o próximo middleware na pilha.

#### **Exemplo Simples de Middleware**
Aqui está um exemplo básico de middleware que registra o horário de cada requisição:

```javascript
const logRequest = (req, res, next) => {
  console.log(`Requisição recebida em: ${new Date().toISOString()}`);
  next(); // Passa para o próximo middleware ou rota
};
```

---

### **Como Funcionam Middlewares em Rotas Protegidas?**

#### **Fluxo de uma Rota Protegida**
1. **Requisição:** O cliente (frontend) envia uma requisição para uma rota protegida, incluindo o token JWT no cabeçalho `Authorization`.
2. **Middleware de Autenticação:** O middleware verifica se o token é válido.
   - Se o token for válido, o middleware adiciona o ID do usuário ao objeto `req` e chama o próximo middleware ou rota.
   - Se o token for inválido ou não for fornecido, o middleware retorna uma resposta de erro (ex: `401 Unauthorized`).
3. **Rota Protegida:** Se o middleware de autenticação passar, a rota protegida é executada. Ela pode acessar o ID do usuário a partir de `req.userId` para realizar operações específicas do usuário.

---

### **Exemplo de Middleware de Autenticação**
Aqui está um exemplo de middleware que verifica o token JWT:

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredoSuperSecreto'; // Chave secreta para JWT

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifica o token
    req.userId = decoded.userId; // Adiciona o ID do usuário à requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};
```

#### **Partes do Código:**
- **`req.header('Authorization')`:** Obtém o token JWT do cabeçalho da requisição.
- **`jwt.verify`:** Verifica a assinatura do token.
- **`req.userId`:** Adiciona o ID do usuário ao objeto `req` para uso posterior.
- **`next()`:** Passa o controle para o próximo middleware ou rota.

---

### **Como Usar Middlewares em Rotas Protegidas?**

#### **Exemplo de Rota Protegida**
Aqui está um exemplo de rota protegida que retorna os detalhes do usuário:

```javascript
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { findUserById } from '../models/userModel';

const router = express.Router();

// Rota protegida
router.get('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuário' });
  }
});

export default router;
```

#### **O que acontece nessa rota?**
1. O cliente envia uma requisição GET para `/users/1` com o token JWT no cabeçalho `Authorization`.
2. O middleware `authenticate` verifica o token:
   - Se o token for válido, ele adiciona o ID do usuário ao `req` e chama a função da rota.
   - Se o token for inválido, ele retorna um erro `401 Unauthorized`.
3. A função da rota busca o usuário no banco de dados usando o ID fornecido na URL e retorna os detalhes do usuário.

---

### **Benefícios de Usar Middlewares**
1. **Reutilização de Código:** Middlewares podem ser reutilizados em várias rotas.
2. **Separação de Responsabilidades:** A lógica de autenticação, validação, etc., fica separada da lógica das rotas.
3. **Facilidade de Manutenção:** Alterações na lógica de autenticação ou validação podem ser feitas em um único lugar.

---

### **Exemplo Completo de Middleware e Rota Protegida**

#### **Middleware de Autenticação**
```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredoSuperSecreto'; // Chave secreta para JWT

export const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verifica o token
    req.userId = decoded.userId; // Adiciona o ID do usuário à requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};
```

#### **Rota Protegida**
```javascript
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { findUserById } from '../models/userModel';

const router = express.Router();

// Rota protegida
router.get('/users/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await findUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar usuário' });
  }
});

export default router;
```

---

### **Conclusão**
Middlewares são uma ferramenta poderosa para adicionar lógica adicional ao ciclo de requisição-resposta. Eles são especialmente úteis para proteger rotas, validar dados e centralizar a lógica de autenticação. Com middlewares, você pode criar aplicações mais organizadas, seguras e fáceis de manter.

