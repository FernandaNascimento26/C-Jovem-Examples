let novoElemento = document.createElement("p");
let texto = document.createTextNode("Fernanda");

novoElemento.appendChild(texto); // <p>Fernanda</p>

let elementoAlvo = document.querySelector("#titulo-principal");
let elementoPai = document.querySelector("#container-principal");

elementoPai.insertBefore(novoElemento, elementoAlvo);



