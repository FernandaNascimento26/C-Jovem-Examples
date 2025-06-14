// Classe base para usuários comuns
class Usuario {
  #senha; // campo privado, acessado apenas internamente

  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.#senha = senha; // valor protegido
    this.senhaOriginal = senha; // salvo para exportar (não privado)
  }

  // método para validar senha digitada
  validarSenha = senhaDigitada => senhaDigitada === this.#senha;

  // método de login para usuários comuns
  login = (email, senhaDigitada) => {
    return email === this.email && this.validarSenha(senhaDigitada)
      ? `Bem-vindo(a), ${this.nome}`
      : "Email ou senha incorretos.";
  }
}

// Classe derivada para administradores
class Administrador extends Usuario {
  constructor(nome, email, senha, nivel = "admin") {
    super(nome, email, senha); // reutiliza constructor do Usuario
    this.nivel = nivel;
  }

  // sobrescreve o login com resposta diferente
  login = (email, senhaDigitada) => {
    return email === this.email && this.validarSenha(senhaDigitada)
      ? `Admin ${this.nome} logado com sucesso.`
      : "Acesso negado ao administrador.";
  }
}
