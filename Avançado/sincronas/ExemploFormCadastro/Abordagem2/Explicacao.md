```markdown
# Cadastro de Usuários com Papéis Diferenciados

Ao acessar a plataforma, o usuário escolhe se quer se cadastrar como paciente ou como profissional. Cada tipo de perfil tem seu próprio conjunto de campos obrigatórios. Após o envio do formulário, os dados são validados e armazenados no banco, respeitando as regras de modelagem.

Este projeto pode ser adaptado facilmente para outras situações onde há diferentes papéis (como aluno/professor, cliente/empresa, etc.), com estruturas e formulários distintos para cada um.

---


## Passo a Passo para rodar o projeto


### 📦 Backend (API)

1. Vá até a pasta `backend`:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com a URL do seu banco PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco"
   ```

4. Gere o client do Prisma e a estrutura do banco:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Inicie o servidor:
   ```bash
   cd src
   node server.js
   ```

---

### Frontend 

1. Vá até a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` com a URL da API backend:
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. Inicie o frontend:
   ```bash
   npm run dev
   ```

5. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---