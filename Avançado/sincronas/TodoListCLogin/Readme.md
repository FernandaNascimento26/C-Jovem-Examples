## Frontend - Todo App com Login e Acesso por Tipo de Usuário

Este é o projeto **frontend** de uma aplicação de lista de tarefas (Todo App), que possui autenticação JWT e diferenciação de usuários por tipo (admin e comum).

### Tecnologias utilizadas
- React (com Vite)
- React Router DOM
- Axios

---

### Instalação e Execução

1. Clone o repositório do frontend:
```bash
cd react-todo-list
npm install
```

2. Configure a variável de ambiente:
Crie um arquivo `.env` na raiz com a seguinte variável:
```env
VITE_API_URL=http://localhost:3001/api
```

3. Inicie o projeto:
```bash
npm run dev
```

---

### Funcionalidades

- Login com autenticação JWT
- Cadastro de novos usuários
- Redirecionamento baseado no tipo de usuário:
  - **TIPO1**: acesso ao painel de admin com todas as tarefas e informação do criador
  - **TIPO2**: acesso às suas próprias tarefas
- Criação, edição e exclusão de tarefas
- Busca interativa no painel admin por nome do usuário ou texto da tarefa

---

### Integração com o Backend

- Todas as requisições são feitas via `axios`, apontando para `VITE_API_URL`
- O token JWT é armazenado no `localStorage` após o login
- Esse token é incluído automaticamente nos headers das requisições com o `Authorization: Bearer <token>`

---

### Estrutura de Arquivos

```
src/
├── components/         # Componentes reutilizáveis (Header, TodoItem, etc)
├── pages/              # Páginas principais (Login, Register, Todos, AdminPanel)
├── services/           # Serviços para acesso à API (authService, todoService, userService)
└── App.jsx            # Configuração das rotas
```

---

## Backend - API Node.js com Prisma e JWT

Este é o projeto **backend** da aplicação Todo App, feito com Express e Prisma ORM, com suporte a autenticação JWT e autorização por tipo de usuário.

### Tecnologias utilizadas
- Node.js + Express
- Prisma ORM + PostgreSQL
- JSON Web Token (JWT)
- Bcrypt.js

---

### Instalação e Execução

1. Clone o repositório do backend:
```bash
cd TodoList_Backend
npm install
```

2. Configure o banco de dados e variáveis:
Crie um arquivo `.env`:
```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=segredo_super_secreto
```

3. Gere as tabelas no banco:
```bash
npx prisma migrate dev --name init
```

4. Inicie o servidor:
```bash
npm run dev
```

---

### Endpoints principais

#### Autenticação
- `POST /api/auth/register` - cria um novo usuário
- `POST /api/auth/login` - retorna um token JWT

#### Usuário
- `GET /api/users/profile` - retorna os dados do usuário autenticado

#### Todos
- `GET /api/todos` - retorna todos os todos (apenas para TIPO1)
- `GET /api/todos` - retorna os todos do usuário logado (TIPO2)
- `POST /api/todos` - cria uma nova tarefa
- `PUT /api/todos/:id` - marca como concluída ou edita texto
- `DELETE /api/todos/:id` - exclui uma tarefa (apenas admin ou dono)

---

### Autenticação e Autorização

- O login retorna um **JWT token** contendo `userId` e `tipo`
- As rotas protegidas usam o middleware `authMiddleware` para verificar o token
- O `userId` é adicionado em `req.user`, permitindo restrições baseadas no tipo
- O frontend envia o token no header: `Authorization: Bearer <token>`

---

### Estrutura

```
src/
├── controllers/     # Regras de negócio (authController, todoController, userController)
├── models/          # Camada de acesso ao banco com Prisma (UserModel, TodoModel)
├── routes/          # Arquivos de rota (authRoutes, userRoutes, todoRoutes)
├── middleware/      # Middleware de autenticação (authMiddleware.js)
├── prisma/          # Schema do banco
.env
server.js
```