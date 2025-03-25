# Explicação do Fluxo de Cadastro em Dois Passos

## Conceito Central

O sistema implementa um cadastro inteligente que:

1. **Cria simultaneamente** o usuário E seu perfil específico (Paciente/Profissional) na primeira etapa
2. **Redireciona** para completar os detalhes adicionais
3. **Atualiza** o perfil já existente (não cria um novo)

## Fluxo Detalhado

### Passo 1: Criação Conjunta (Frontend → Backend)

1. Usuário preenche:
   - Dados básicos (email, senha, nome)
   - Tipo (Paciente/Profissional)
   - Os demais campos de paciente e profissional não devem estar como obrigatórios

2. Frontend envia para `/api/usuarios`:
   ```json
   {
     "email": "exemplo@email.com",
     "senha": "123456",
     "nome": "Fulano Silva",
     "tipo": "PACIENTE",
     "genero": "MASCULINO"
   }
   ```

### Passo 2: Processamento no Backend

1. **Transação única** no banco de dados:
   - Cria registro na tabela `Usuario`
   - Cria registro vinculado em `Paciente` ou `Profissional` com:
     - ID do usuário
     - Nome inicial

2. Retorna resposta com ambos IDs:
   ```json
   {
     "usuarioId": 1,
     "perfilId": 1
   }
   ```

### Passo 3: CompletaComplemento do Perfil (Frontend)

1. **Redirecionamento inteligente**:
   - Para `/completar-paciente/1` (se tipo=PACIENTE)
   - Para `/completar-profissional/1` (se tipo=PROFISSIONAL)

2. **Dados são enviados como atualização** (PUT):
   - Não cria novo registro
   - Atualiza o perfil já existente:
   ```json
   {
     "data_nasc": "1990-01-01",
     "motivo_terapia": "Ansiedade",
     // ... outros campos
   }
   ```

## Exemplo Prático no Código

### Backend - Criação Conjunta
```javascript
// Cria usuário E perfil numa única operação
const usuario = await prisma.usuario.create({
  data: {
    email: "exemplo@email.com",
    senha: "123456",
    tipo: "PACIENTE",
    pacientes: {  // Criação simultânea do paciente
      create: {
        nome: "Fulano Silva",
      }
    }
  },
  include: {
    pacientes: true  // Retorna o paciente criado
  }
});
```

### Frontend - Atualização Posterior
```javascript
// Atualiza o paciente já existente
await api.put(`/pacientes/${perfilId}`, {
  data_nasc: "1990-01-01",
  // ... outros campos
});
```