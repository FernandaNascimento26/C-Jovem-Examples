/*Acessando o DOM*/
document.addEventListener("DOMContentLoaded", function () {
console.log(document.body); // Exibe o elemento <body> inteiro no console
console.log(document.body.childNodes); // Exibe todos os nós filhos do <body>
console.log(document.body.childNodes[1]); // Acessa o segundo nó filho do <body>
console.log(document.body.childNodes[1].childNodes[1]); // Acessa o segundo nó filho dentro do nó anterior
console.log(document.body.childNodes[1].childNodes[1].textContent); // Exibe o conteúdo de texto do nó acessado
});