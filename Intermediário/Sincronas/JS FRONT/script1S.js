/*Acessando o DOM*/
document.addEventListener("DOMContentLoaded", function () {
console.log(document.body); // Exibe o elemento <body> inteiro no console
console.log(document.body.childNodes); // Exibe todos os nós filhos do <body>
console.log(document.body.childNodes[1]); // Acessa o segundo nó filho do <body>
console.log(document.body.childNodes[1].childNodes[1]); // Acessa o segundo nó filho dentro do nó anterior
console.log(document.body.childNodes[1].childNodes[1].textContent); // Exibe o conteúdo de texto do nó acessado


/*Encontrando Elementos*/


console.log(document.getElementsByTagName('h1')); // Encontrando elementos por tag
console.log(document.getElementsByClassName('minhaclasse')); // Encontrando elementos por classe
console.log(document.getElementById('esteID')) //Encontrando elementos por ID
console.log(document.querySelector('#esteID')) //Encontrando elementos por query


/* Alterando a DOM com insertBefore*/
let span= document.createElement("span");
let el = document.querySelector("h1");
let pai = el.parentNode;

pai.insertBefore(span, el);


/*Alterando a DOM com appendChild */

let p= document.createElement("p");
let el2 = document.querySelector("h1");
let pai2 = el2.parentNode;

pai2.appendChild(p);


/**Alterando a DOM com replaceChild */
let newHead

});