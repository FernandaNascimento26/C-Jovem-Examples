# API de Alunos

Este projeto fornece uma API REST para gerenciamento de alunos, utilizando Node.js, Express e Prisma.

> **Repositório:**
> [https://github.com/FernandaNascimento26/C-Jovem-Examples/tree/main/Ciclo%202/Avançado/Pratica%20Back%20FSN2](https://github.com/FernandaNascimento26/C-Jovem-Examples/blob/main/Ciclo%202/Avan%C3%A7ado/Pratica%20Back)

---

## Pré-requisitos

* Node.js v16 ou superior
* npm ou yarn
* PostgreSQL instalado e em execução
* (Opcional) `nodemon` para desenvolvimento com reload automático

---

## Passos para execução local

### 1. Clonar o repositório e navegar até o diretório do projeto

```bash
# Clonar o repositório principal
git clone https://github.com/FernandaNascimento26/C-Jovem-Examples.git

# Entrar na pasta do exercício Prática Back/academia-api
cd "C-Jovem-Examples/Ciclo 2/Avançado/Pratica Back/academia-api"
```

### 2. Criar o banco de dados

> **Atenção:** crie apenas o banco de dados, sem tabelas ou esquemas adicionais.

No terminal do PostgreSQL (psql) ou via cliente gráfico:

```sql
CREATE DATABASE nome_do_banco;
```

### 3. Configurar variáveis de ambiente

1. Renomeie ou copie o arquivo de exemplo:

   ```bash
   cp .env.example .env
   ```
2. Edite o `.env` e configure a URL de conexão:

   ```dotenv
   DATABASE_URL="postgresql://<usuario>:<senha>@localhost:5432/<nome_do_banco>?schema=public"
   ```
3. Ajuste outras variáveis se necessário.

### 4. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 5. Gerar o cliente Prisma

```bash
npx prisma generate
```

### 6. Executar migrações

> Esse comando criará as tabelas conforme o schema Prisma:

```bash
npx prisma migrate dev --name init
```

### 7. Configurar scripts no `package.json`

Verifique se a seção `scripts` está assim:

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "prisma": "prisma"
  }
}
```

* `npm run dev` — inicia o servidor em modo de desenvolvimento (watch).
* `npm start` — inicia o servidor em modo de produção.
* `npm run prisma` — atalho para comandos do Prisma CLI.

### 8. Iniciar a aplicação

* **Desenvolvimento:**

  ```bash
  npm run dev
  ```
* **Produção:**

  ```bash
  npm start
  ```

A API estará disponível em `http://localhost:3001` por padrão.

---

## Testando a API

### No navegador (GET)

Abra seu navegador e acesse:

* Listar todos os alunos: `http://localhost:3001/api/aluno`
* Buscar um aluno por ID (exemplo ID=1): `http://localhost:3001/api/aluno/1`

Você verá o JSON de resposta diretamente na tela.

### No Insomnia (ou outra REST client)

1. Crie uma nova requisição e selecione o método HTTP.
2. Informe a URL, por exemplo: `http://localhost:3001/api/aluno`
3. Defina headers (quando necessário):

   * `Content-Type: application/json`
4. No body:

   * **POST** `/api/aluno` (criar aluno):

     ```json
     {
       "nome": "Maria Oliveira",
       "data_nascimentocimento": "1998-07-20",
       "email": "maria.oliveira@example.com"
     }
     ```
   * **PUT** `/api/aluno/1` (atualizar aluno):

     ```json
     {
       "nome": "Maria Silva",
       "data_nascimento": "1998-07-20",
       "email": "maria.silva@example.com"
     }
     ```
5. Clique em **Send** e veja a resposta JSON.

Para facilitar, você pode copiar este cURL no Insomnia ou terminal:

```bash
curl --request POST \
  --url http://localhost:3001/api/aluno \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "Maria Oliveira",
    "data_nascimento": "1998-07-20",
    "email": "maria.oliveira@example.com"
  }'
```

---

## Endpoints principais

* `GET /api/aluno` — lista todos os alunos.
* `GET /api/aluno/:id` — busca um aluno por ID.
* `POST /api/aluno` — cria um novo aluno.
* `PUT /api/aluno/:id` — atualiza um aluno existente.
* `DELETE /api/aluno/:id` — remove um aluno.

> Consulte o arquivo `src/routes/alunoRoutes.js` para detalhes de rotas e payloads.

---

## Scripts úteis e ferramentas

* `npx prisma studio` — abre o Studio (UI do Prisma) no navegador.
* `npx prisma migrate status` — exibe o estado das migrações.

---

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.
