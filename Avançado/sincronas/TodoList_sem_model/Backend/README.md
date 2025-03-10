# Todo List Backend (Sem Camada de Models)

Este é um backend simples para uma aplicação de lista de tarefas (**Todo List**), construído com **Node.js**, **Express** e **Prisma**. Ele segue a abordagem **sem camada de models**, onde o Prisma Client é usado diretamente nos controladores.

## 🚀 Como executar o projeto

### **Pré-requisitos**
- Node.js (v18 ou superior)
- npm ou yarn
- Banco de dados SQLite (ou outro banco de dados configurado no Prisma)

### **Passos para configurar**

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/FernandaNascimento26/C-Jovem-Examples/tree/main/Avan%C3%A7ado/sincronas/TodoList_sem_model.git
   cd todo-list-sem-models
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o banco de dados:**
   - Edite o arquivo `.env` e defina a URL do banco de dados.

4. **Execute as migrações do Prisma para criar as tabelas no banco de dados:**
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Inicie o servidor:**
   ```sh
   node src/server.js
   ```

## 📁 Estrutura do projeto

```
 todo-list-sem-models/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   └── todoController.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## 🌐 Rotas da API

### **Tarefas**
- `GET /todos` - Lista todas as tarefas.
- `POST /todos` - Adiciona uma nova tarefa.
- `PUT /todos/:id` - Alterna o status de uma tarefa (concluída/não concluída).
- `DELETE /todos/:id` - Remove uma tarefa.

## 🛠 Testando a API

Use ferramentas como **Insomnia** ou **Postman** para testar as rotas.

## 📦 Dependências
- **Express**: Framework para criar o servidor.
- **Prisma**: ORM para interagir com o banco de dados.
- **PostgreSQL**: Banco de dados usado no projeto.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

