let novoElemento = document.createElement("h1");
let texto = document.createTextNode("João Pedro");

novoElemento.appendChild(texto);

let p = document.querySelector("#paragrafo-principal");
let pai = p.parentNode;

pai.appendChild(novoElemento);
