// Uma classe é um molde (modelo) que usamos para criar objetos. Esses objetos devem ter a mesma estrutura mas os dados são diferentes

class Pessoa{
    //Atributos são as características de uma classe
    constructor(nome, idade, profissao, estadoCivil, filhos){
        this.nome = nome;
        this.idade = idade;
        this.profissao = profissao;
        this.estadoCivil = estadoCivil;
        this.filhos = filhos; 
    }

    //Métodos são as ações que a classe pode realizar
    apresentar(){
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, sou ${this.profissao}, meu estado civil é ${this.estadoCivil} e tenho ${this.filhos} filhos.`);
    }
}


// Criando instâncias da classe Pessoa
const nayla = new Pessoa("Nayla", 22, "Desenvolvedora Frontend", "solteira", 0);
const matheus = new Pessoa("Matheus", 25, "Desenvolvedor Backend", "casado", 1);
const chrys = new Pessoa("Chrys", 23, "Gerente de Projetos", "Namorando", 0);

nayla.apresentar();
matheus.apresentar();
chrys.apresentar();

//Herança
class Estudante extends Pessoa{
    constructor(nome, idade, profissao,curso, semestre){
        super(nome, idade, profissao); // Chama o construtor da classe pai (Pessoa)
        this.curso = curso; // Atributo específico da classe Estudante
        this.semestre = semestre; 
    }
    apresentar(){
        //super.apresentar();  //Chama o método apresentar da classe pai (Pessoa)

        //sobrescrever o método apresentar da classe pai
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos, sou ${this.profissao}. Estou cursando ${this.curso} e estou no ${this.semestre}º semestre.`);
    }
}

const emanuel = new Estudante("Emanuel", 20, "Estudante", "Engenharia de Software", 3);

emanuel.apresentar();

console.log(emanuel); 

emanuel.nome = "Emanuel Victor";

console.log(emanuel.nome); 



//Modificadores de acesso
// public, private, protected
// public: Atributos e métodos públicos podem ser acessados de qualquer lugar.
// private: Atributos e métodos privados só podem ser acessados dentro da própria classe.
// protected: Atributos e métodos protegidos podem ser acessados dentro da própria classe e por classes que herdam dela. Javascript não possui modificadores de acesso nativos como outras linguagens, mas podemos simular isso usando convenções de nomenclatura.

class Conta{
    constructor(dono, numero, senha, saldo = 0){

        this._dono = dono;
        this._numero = numero;
        this._senha = senha;
        this._saldo = saldo; 
    }

    get dono() {
        return this._dono;
    }

    get senha() {
        return this._senha;
    }

    set senha(novaSenha) {
        if (novaSenha.length >= 6) {
            this._senha = novaSenha;
        } else {
            console.log("A senha deve ter pelo menos 6 caracteres.");
        }
    }

}

const novaConta = new Conta("Rony", "123456", "senha123", 1000);

console.log(novaConta.dono); 

novaConta.dono = "Raynara";

console.log(novaConta.dono); 

console.log(novaConta.senha);
novaConta.senha = "123"; 
console.log(novaConta.senha);

console.log(novaConta.saldo) 

//Polimorfismo

class Animal{
    constructor(nome, especie){
        this.nome = nome;
        this.especie = especie;
    }

    emiteSom(){
        console.log(`${this.nome} faz um som.`);
    }
}

class Cachorro extends Animal{
    constructor(nome, especie){
        super(nome, especie);

    }

    emiteSom(){
        console.log(`${this.nome} late.`);
    }
}

class Gato extends Animal{
    constructor(nome, especie){
        super(nome, especie);

    }

    emiteSom(){
        console.log(`${this.nome} mia.`);
    }
}


class FormaPagamento{
    constructor(valor){
        this.valor = valor
    }

    pagar(){
        console.log(`Pagamento de R$${this.valor} realizado.`);
    }
}

class cartaoCredito extends FormaPagamento{

    pagar(){
        console.log(`Pagamento de R$${this.valor} realizado com cartão de crédito`);
    }
}

class Pix extends FormaPagamento{

    pagar(){
        console.log(`Pagamento de R$${this.valor} realizado via Pix`);
    }
}

class Boleto extends FormaPagamento{

    pagar(){
        console.log(`Pagamento de R$${this.valor} realizado via Boleto`);
    }
}


const pagamentos = [
    new cartaoCredito(100),
    new Pix(50),
    new Boleto(30)
];

pagamentos.forEach(pagamento => {
    pagamento.pagar();
});

