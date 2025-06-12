let novoElemento = document.createElement("h1");
let texto = document.createTextNode("Pedro");

novoElemento.appendChild(texto); //<h1>Pedro</h1>

let p = document.querySelector("#paragrafo-principal");
let pai = p.parentNode;

pai.appendChild(novoElemento);

