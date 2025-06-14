// Carrega os usuários salvos do localStorage, se houver
const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];

// Constrói objetos de classe a partir dos dados salvos
const usuarios = usuariosSalvos.map(u =>
  u.tipo === "admin"
    ? new Administrador(u.nome, u.email, u.senha, u.nivel)
    : new Usuario(u.nome, u.email, u.senha)
); 

// Referências aos elementos do DOM
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const mensagemDiv = document.getElementById("mensagem");
const btnEntrar = document.getElementById("btnEntrar");

const cadNome = document.getElementById("cadNome");
const cadEmail = document.getElementById("cadEmail");
const cadSenha = document.getElementById("cadSenha");
const cadTipo = document.getElementById("cadTipo");
const btnCadastrar = document.getElementById("btnCadastrar");

const telaLogin = document.getElementById("tela-login");
const telaUsuario = document.getElementById("tela-usuario");
const telaAdmin = document.getElementById("painel-admin");
const nomeUsuarioSpan = document.getElementById("nomeUsuario");
const listaUsuarios = document.getElementById("listaUsuarios");

// Função para alternar telas
const exibirTela = (elemento) => {
  document.querySelectorAll(".form-container").forEach(div => {
    div.classList.remove("active");
    div.classList.add("hidden");
  });
  elemento.classList.add("active");
  elemento.classList.remove("hidden");
};

// Evento de login
btnEntrar.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    mensagemDiv.textContent = "Usuário não encontrado.";
    return;
  }

  const msg = usuario.login(email, senha);
  mensagemDiv.textContent = msg;

  if (msg.startsWith("Bem-vindo")) {
    nomeUsuarioSpan.textContent = usuario.nome;
    exibirTela(telaUsuario);
  } else if (msg.startsWith("Admin")) {
    exibirTela(telaAdmin);
    listaUsuarios.innerHTML = usuarios.map(u => `<li>${u.nome} - ${u.email}</li>`).join("");
  }
});

// Evento de cadastro
btnCadastrar.addEventListener("click", () => {
  const nome = cadNome.value.trim();
  const email = cadEmail.value.trim();
  const senha = cadSenha.value.trim();
  const tipo = cadTipo.value;

  if (!nome || !email || senha.length < 6) {
    mensagemDiv.textContent = "Preencha corretamente (senha com no mínimo 6 caracteres).";
    return;
  }

  if (usuarios.some(u => u.email === email)) {
    mensagemDiv.textContent = "Email já cadastrado.";
    return;
  }

  const novo = tipo === "admin"
    ? new Administrador(nome, email, senha)
    : new Usuario(nome, email, senha);

  usuarios.push(novo);

  localStorage.setItem("usuarios", JSON.stringify(
    usuarios.map(u => ({
      nome: u.nome,
      email: u.email,
      senha: u.senhaOriginal,
      tipo: u instanceof Administrador ? "admin" : "usuario",
      nivel: u.nivel || null
    }))
  ));

  mensagemDiv.textContent = "Usuário cadastrado! Agora faça login.";
  cadNome.value = cadEmail.value = cadSenha.value = "";
});

// Mostra a tela de login ao carregar
exibirTela(telaLogin);

// Alterna formulário de cadastro
const btnToggleCadastro = document.getElementById("btnToggleCadastro");
const formCadastro = document.getElementById("form-cadastro");

btnToggleCadastro.addEventListener("click", () => {
  formCadastro.classList.toggle("hidden");
});
