## **Autenticação com JWT**

### **Introdução**
Este guia explica como implementar autenticação usando **JWT (JSON Web Tokens)** em uma aplicação backend. Vamos cobrir desde a instalação das dependências até a criação de rotas protegidas.

---

### **O que é JWT?**
JWT (JSON Web Token) é um padrão aberto (RFC 7519) que define uma forma compacta e segura de transmitir informações entre partes como um objeto JSON. Ele é frequentemente usado para autenticação e troca de informações em aplicações web.

#### **Estrutura de um JWT**
Um JWT é composto por três partes:
1. **Header:** Contém o tipo de token e o algoritmo de criptografia.
2. **Payload:** Contém as informações (claims) que você deseja transmitir (ex: ID do usuário).
3. **Signature:** Garante que o token não foi alterado.

Exemplo de JWT:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### **Como Funciona o JWT?**
O JWT é gerado no servidor após o usuário se autenticar (por exemplo, ao fazer login). Ele é então enviado ao cliente (frontend) e armazenado (geralmente no `localStorage` ou `sessionStorage`). O cliente envia o token em cada requisição subsequente para acessar rotas protegidas.

#### **Processo de Geração do JWT**
1. O usuário faz login, fornecendo email e senha.
2. O servidor verifica as credenciais.
3. Se as credenciais forem válidas, o servidor gera um JWT e o envia ao cliente.

#### **Processo de Verificação do JWT**
1. O cliente envia o JWT no cabeçalho `Authorization` das requisições.
2. O servidor verifica a assinatura do JWT para garantir que ele não foi alterado.
3. Se o token for válido, o servidor permite o acesso à rota solicitada.

---

### **O que é Bcrypt?**
Bcrypt é uma biblioteca usada para criptografar senhas. Ele aplica um algoritmo de hash (função unidirecional) para transformar a senha em uma string irreversível. Isso garante que, mesmo que o banco de dados seja comprometido, as senhas dos usuários permaneçam seguras.

#### **Processo de Criptografia com Bcrypt**
1. **Criptografar a senha:** Quando o usuário se cadastra, a senha é criptografada antes de ser armazenada no banco de dados.
2. **Verificar a senha:** Quando o usuário faz login, a senha fornecida é comparada com a senha criptografada armazenada no banco de dados.

---

### **Passo a Passo para Implementar JWT e Bcrypt**

#### **1. Instalar Dependências**
Instale as bibliotecas necessárias:

```bash
npm install jsonwebtoken bcrypt
```

- **`jsonwebtoken`:** Para gerar e verificar tokens JWT.
- **`bcrypt`:** Para criptografar e comparar senhas.

---

#### **2. Gerar Token JWT**
No servidor, após o usuário se autenticar, gere um token JWT:

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredoSuperSecreto'; // Chave secreta para assinar o token

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
};
```

#### **Partes do Código:**
- **`jwt.sign`:** Gera o token.
- **`{ userId }`:** Payload (dados que serão armazenados no token).
- **`JWT_SECRET`:** Chave secreta usada para assinar o token.
- **`{ expiresIn: '1h' }`:** Define o tempo de expiração do token.

---

#### **3. Criptografar Senha com Bcrypt**
Ao cadastrar um usuário, criptografe a senha antes de armazená-la no banco de dados:

```javascript
import bcrypt from 'bcrypt';

const saltRounds = 10; // Número de rounds para gerar o salt

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};
```

#### **Partes do Código:**
- **`bcrypt.hash`:** Criptografa a senha.
- **`saltRounds`:** Define a complexidade do hash (quanto maior, mais seguro, mas mais lento).

---

#### **4. Verificar Senha com Bcrypt**
Ao fazer login, compare a senha fornecida com a senha criptografada armazenada:

```javascript
import bcrypt from 'bcrypt';

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

#### **Partes do Código:**
- **`bcrypt.compare`:** Compara a senha fornecida com a senha criptografada.

---

#### **5. Verificar Token JWT**
Crie um middleware para verificar o token JWT em rotas protegidas:

```javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'segredoSuperSecreto';

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
- **`jwt.verify`:** Verifica a assinatura do token.
- **`req.userId`:** Adiciona o ID do usuário ao objeto `req` para uso posterior.

---

#### **6. Proteger Rotas**
Use o middleware `authenticate` para proteger rotas que exigem autenticação:

```javascript
import express from 'express';
import { authenticate } from './middlewares/authMiddleware';

const router = express.Router();

// Rota protegida
router.get('/protected-route', authenticate, (req, res) => {
  res.json({ message: 'Você acessou uma rota protegida!', userId: req.userId });
});

export default router;
```

---

### **Links para Documentação**
- **JWT:** [Documentação oficial](https://jwt.io/)
- **Bcrypt:** [Documentação oficial](https://www.npmjs.com/package/bcrypt)

---

### **Conclusão**
Com JWT e Bcrypt, você pode implementar um sistema de autenticação seguro e eficiente. O JWT permite transmitir informações de forma segura entre o cliente e o servidor, enquanto o Bcrypt garante que as senhas dos usuários sejam armazenadas de forma segura.

