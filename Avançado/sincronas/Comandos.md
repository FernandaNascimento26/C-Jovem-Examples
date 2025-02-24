# Comandos Essenciais para Configurar e Executar o Projeto

## 1. Inicializar o Projeto Node.js
```bash
npm init -y
```
**O que faz?**  
Cria o arquivo `package.json` com as dependências e scripts do projeto.  

**Quando usar?** No início do projeto ou se o `package.json` não existir.

---

## 2. Instalar Dependências
```bash
npm install express @prisma/client
npm install prisma --save-dev
```
**O que faz?**  
- `express`: Framework para criar o servidor.  
- `@prisma/client`: Cliente do Prisma para interagir com o banco de dados.  
- `prisma` (dev): CLI do Prisma para migrações e schemas.  

**Quando usar?** No início ou ao adicionar novas dependências.

---

## 3. Inicializar o Prisma
```bash
npx prisma init
```
**O que faz?**  
Cria a pasta `prisma` e o arquivo `.env` para configurações.  

**Quando usar?** Na primeira configuração do projeto.

---

## 4. Configurar o Banco de Dados (`.env`)
```bash
DATABASE_URL=""
```
**O que faz?**  
Define a URL do banco de dados (Postgres no exemplo).  

**Quando usar?** Após executar `npx prisma init`.

---

## 5. Criar/Editar o Schema do Banco de Dados
Edite o arquivo `prisma/schema.prisma` com os modelos (ex: `Aluno` e `Plano`).

---

## 6. Executar Migrações do Prisma
```bash
npx prisma migrate dev --name init
```
**O que faz?**  
Cria as tabelas no banco de dados e gera migrações.  

**Quando usar?** Após alterar o `schema.prisma`.

---

## 7. Gerar o Prisma Client
```bash
npx prisma generate
```
**O que faz?**  
Gera o cliente do Prisma para interagir com o banco.  

**Quando usar?** Após migrações ou mudanças no schema.

---

## 8. Criar a Estrutura de Pastas
```bash
mkdir -p src/{controllers,models,routes}
touch src/{app.js,server.js,prisma.js}
```
**O que faz?**  
Organiza o projeto em pastas (`controllers`, `models`, etc.).  

**Quando usar?** No início do projeto.

---

## 9. Iniciar o Servidor
```bash
npm start
```
**O que faz?**  
Executa o servidor usando o script definido no `package.json`. 

**Quando usar?** Sempre que precisar iniciar o servidor.

---

## 10. Testar a API (Exemplo com `curl`)
```bash
# Listar alunos
curl http://localhost:3000/alunos

# Criar aluno
curl -X POST -H "Content-Type: application/json" -d '{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "11999999999",
  "dataNascimento": "2000-01-01",
  "endereco": "Rua Exemplo, 123",
  "planoId": 1
}' http://localhost:3000/alunos
```
**O que faz?**  
Testa as rotas da API via terminal.  

**Quando usar?** Após iniciar o servidor.

---

## 11. Acessar o Banco de Dados via Prisma Studio
```bash
npx prisma studio
```
**O que faz?**  
Abre uma interface web para gerenciar o banco de dados.  

**Quando usar?** Para debug ou manipulação manual.

---

## Comandos Adicionais Úteis

| Comando                     | Descrição                                  |
|-----------------------------|--------------------------------------------|
| `npx prisma migrate reset`  | Reseta o banco e aplica migrações.         |
| `npm run dev`               | Inicia o servidor com `nodemon` (se configurado). |

---

## Resumo dos Passos
1. **Configuração Inicial:**
   ```bash
   npm init -y
   npm install express @prisma/client
   npm install prisma --save-dev
   npx prisma init
   ```

2. **Definir Banco de Dados:**  
   Editar `.env` e `schema.prisma`.

3. **Aplicar Migrações:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

4. **Desenvolver:**  
   Criar controllers, models e routes.

5. **Executar:**
   ```bash
   npm start
   ```

6. **Testar:**  
   Use `curl`, Insomnia ou Postman.
```