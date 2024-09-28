Aqui está um exemplo de **README.md** para o seu projeto da cafeteria. Ele inclui as instruções para configurar e executar o projeto completo, incluindo o front-end e o back-end.

---

# Café do Amanhã ☕  
### Projeto de Sistema de Gerenciamento de Pedidos

Este projeto é um sistema completo de gerenciamento de pedidos para a cafeteria "Café do Amanhã". Ele foi desenvolvido com um **front-end em React** e um **back-end com Node.js, Express e PostgreSQL** usando o **Prisma ORM**.

## Funcionalidades
- **Menu Dinâmico:** Carrega itens do menu diretamente do banco de dados e exibe no front-end.
- **Sistema de Pedidos:** Permite que clientes façam pedidos, que são processados e armazenados no banco de dados.
- **Formulário de Contato:** Envia mensagens de contato diretamente para o back-end.
  
## Tecnologias Utilizadas
- **Front-end:**
  - React
  - Bootstrap (para estilização)
  - Axios (para fazer requisições HTTP)

- **Back-end:**
  - Node.js
  - Express
  - Prisma ORM
  - PostgreSQL (Banco de Dados)

---

## Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado. Para verificar a instalação, use:
   ```bash
   node -v
   ```

2. **PostgreSQL**: O banco de dados utilizado no projeto é o PostgreSQL. Instale-o se ainda não tiver:
   - [PostgreSQL Download](https://www.postgresql.org/download/)

3. **Git**: Certifique-se de ter o Git instalado para clonar o repositório.

---

## Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/cafe-do-amanha.git
cd cafe-do-amanha
```

### 2. Configuração do Back-end

#### 2.1. Acesse a pasta do back-end:

```bash
cd cafe-backend
```

#### 2.2. Instale as dependências:

```bash
npm install
```

#### 2.3. Configure o banco de dados PostgreSQL:
- No PostgreSQL, crie um banco de dados chamado `cafedb`.
- Atualize o arquivo `.env` na raiz do back-end com suas credenciais do banco de dados:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cafedb?schema=public"
```

#### 2.4. Realize as migrations para criar as tabelas:

```bash
npx prisma migrate dev
```

#### 2.5. Inicie o servidor:

```bash
npm start
```

O servidor estará rodando em `http://localhost:4000`.

### 3. Configuração do Front-end

#### 3.1. Acesse a pasta do front-end:

```bash
cd ../cafe-frontend
```

#### 3.2. Instale as dependências:

```bash
npm install
```

#### 3.3. Inicie o front-end:

```bash
npm start
```

O front-end estará disponível em `http://localhost:3000`.

---

## Estrutura de Diretórios

```bash
cafe-do-amanha/
├── cafe-backend/      # Código do servidor back-end (Node.js, Express, Prisma)
│   ├── prisma/        # Configurações e migrations do Prisma
│   ├── src/
│   │   ├── controllers/  # Controladores para as rotas de pedidos e menu
│   │   ├── routes/       # Rotas do sistema
│   │   └── app.js        # Configuração principal do Express
├── cafe-frontend/     # Código do front-end (React)
│   ├── public/
│   ├── src/
│   │   ├── components/   # Componentes React (Menu, Pedidos, Contato)
│   │   └── App.js        # Componente principal
└── README.md          # Documentação do projeto
```

---

## Endpoints API

### Menu

- `GET /api/menu`: Retorna todos os itens do menu.

### Pedidos

- `POST /api/orders`: Envia um novo pedido. O corpo da requisição deve conter o nome do cliente, número da mesa e itens do pedido.

### Contato

- `POST /api/contact`: Envia uma mensagem de contato. O corpo da requisição deve conter nome, e-mail e mensagem.

---

## Testes

Para testar as APIs do back-end, você pode usar o **Insomnia** ou **Postman**:

- Teste o **GET /api/menu** para garantir que os itens do menu estão sendo retornados corretamente.
- Envie uma requisição **POST /api/orders** com os itens do pedido para verificar se o pedido é salvo.
- Teste o **POST /api/contact** para verificar se as mensagens de contato são processadas corretamente.

---

## Possíveis Melhorias

- **Autenticação de usuários**: Adicionar um sistema de login e autorização para gerenciar o acesso ao sistema.
- **Painel de administração**: Criar uma interface para que o administrador gerencie os pedidos e itens do menu.
- **Integração com e-mail**: Enviar as mensagens de contato diretamente para o administrador via e-mail.

---

## Contribuições

Sinta-se à vontade para fazer um fork deste projeto e enviar um pull request com melhorias ou correções.

---

**Divirta-se explorando o sistema!** ☕