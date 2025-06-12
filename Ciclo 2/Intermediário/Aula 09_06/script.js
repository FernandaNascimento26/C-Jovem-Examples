
//Funções

//funçãotradicional
function calcularArea(largura, altura) {

    area = largura * altura;

   return area;

}

console.log(calcularArea(5,10));


// Função anônima - sem hoisting
const calcularAreaAnonima = function(largura, altura) {

    area = largura * altura;

     return area;
}

console.log(calcularAreaAnonima(10,10));

// Arrow Function - sem hoisting
const calcularAreaArrow = (largura, altura) => {

    area = largura * altura;

     return area;
}

console.log(calcularAreaArrow(20,10));

//Arrow Function abreviada
const calcularAreaAbreviada = (largura, altura) => largura * altura;

console.log(calcularAreaAbreviada(30,10));


//Arrays 
const frutas = ['maçã', 'banana', 'laranja'];
const numeros = [1, 2, 3, 4.5, 5];
const validacoes = [true, false, true, false];
const misto = ['maçã', 1, true, 'laranja', 2.5, false];

//console.log(frutas);

console.log(frutas[2]); // Acessando o primeiro elemento do array

// iterando sibre um array
for (let i = 0; i < frutas.length; i++) {
    //console.log(frutas[i]);
}
// forEach - itera sobre cada elemento do array
misto.forEach((item) => {
    //console.log(item);

});

frutas.unshift('manga');

frutas.push('morango')

console.log(frutas);

// Removendo 
frutas.shift(); // Remove o primeiro elemento do array
frutas.pop(); // Remove o último elemento do array


frutas.push('manga')
console.log(frutas);

frutas.splice(2,0,"uva")
console.log(frutas);

frutas.splice(3,1)
console.log(frutas);


//Template Literals
const nome = 'João';
const idade = 30;
const cidade = 'São Paulo';

//forma tradicional
console.log('Meu nome é ' + nome + ', tenho ' + idade + ' anos e moro em ' + cidade + '.');

//Template Literals
console.log(`Meu nome é ${nome}, tenho ${idade} anos e moro em ${cidade}.`);

//operadores ternarios
const idadeUsuario = 18;
const podeDirigir = idadeUsuario >= 18 ? "Pode dirigir" : "Não pode dirigir";

//tradicional
if (idadeUsuario >= 18) {
    console.log("Pode dirigir");
}
else {
    console.log("Não pode dirigir");
}
console.log(podeDirigir);

//Objetos
const bijuterias = {
   brincos: "brincos de pérola",
   colares: "colar de ouro",
   pulseiras: "pulseira de prata",
   aneis: {
        anel1: "anel de diamante",
        anel2: "anel de esmeralda",
        anel3: "anel de safira"
     },

    medir(){
        return `O tamanho do anel é ${this.aneis.anel1}.`;
    }
   } 

// Acessando propriedades do objeto
//console.log(bijuterias);
//console.log(bijuterias.brincos);

console.log(bijuterias.medir());


//Objetos
const pessoa = {
    nome: "João",
    idade: 30,
    profissao: "Desenvolvedor",
    habilidades: ["JavaScript", "Python", "Java"],
    esportes: {
        futebol: "Bom",
        basquete: "Regular",
        natação: "Ótimo"
    },
    // métodos
    apresentar(){
        console.log(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.profissao}.`);
    },

    listarHabilidades() {
        console.log("Habilidades:");
        this.habilidades.forEach((habilidade) => {
            console.log(`- ${habilidade}`);
        });
    }
};

pessoa.apresentar();
pessoa.listarHabilidades();

console.log(pessoa.profissao);

