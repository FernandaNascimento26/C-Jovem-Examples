const http = require('http');  // Importa o módulo HTTP nativo do Node.js

// Função que será chamada para cada requisição recebida
const servidor = http.createServer((req, res) => {
  res.statusCode = 200;  // Define o status HTTP como "OK"
  res.setHeader('Content-Type', 'text/plain');  // Define o cabeçalho da resposta
  res.end('Bem-vindo ao meu servidor Node.js!');  // Envia a resposta ao cliente
});

// O servidor vai escutar requisições na porta 3000
servidor.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
