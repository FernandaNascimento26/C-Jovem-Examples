//vídeo 1
//Funções
function calcularArea(largura, altura) {
    return largura * altura;
}
console.log(calcularArea(5, 3)); // 15

//Eventos
<button onclick="mostrarMensagem()">Enviar</button>

function mostrarMensagem() {
    alert("Dados enviados com sucesso!");
}

//Objetos e métodos
let carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020,
    descricao: function() {
        return `Carro: ${this.marca} ${this.modelo}, Ano: ${this.ano}`;
    }
};
console.log(carro.descricao());

//vídeo 2
//Arrays


//iteração
for (let i = 0; i < listaCompras.length; i++) {
    console.log(listaCompras[i]);
}

listaCompras.forEach(function(item) {
    console.log(item);
});

//métodos de Array
listaCompras.push("café");
console.log(listaCompras); // ["leite", "pão", "ovos", "café"]

listaCompras.pop();
console.log(listaCompras); // ["leite", "pão", "ovos"]

//vídeo 3
//Arrow Functions

//função tradicional
function dobro(n) {
    return n * 2;
}
console.log(dobro(4)); // 8

//Arrow Function
const dobro = n => n * 2;
console.log(dobro(4)); // 8


let numeros = [1,2,3]
let dobrados = numeros.map(n => n * 2);

console.log(dobrados);

//Template Literals
let nome = "Ana";
let mensagem = `Bem-vinda, ${nome}! Estamos felizes em tê-la aqui.`;
console.log(mensagem);


//Vídeo 4
//Promises
let buscaDados = new Promise((resolve, reject) => {
    let sucesso = true; // Simulando uma condição de sucesso
    setTimeout(() => {
        if (sucesso) {
            resolve("Dados carregados com sucesso!");
        } else {
            reject("Erro ao carregar dados.");
        }
    }, 2000);
});

buscaDados.then(mensagem => {
    console.log(mensagem);
}).catch(erro => {
    console.log(erro);
});

//Async/Await
async function carregarDados() {
    try {
        let resposta = await buscaDados;
        console.log(resposta);
    } catch (erro) {
        console.log(erro);
    }
}
carregarDados();


async function buscarUsuario() {
    try {
        let resposta = await fetch('https://jsonplaceholder.typicode.com/users/1');
        let usuario = await resposta.json();
        console.log(usuario);
    } catch (erro) {
        console.log('Erro:', erro);
    }
}
buscarUsuario();
