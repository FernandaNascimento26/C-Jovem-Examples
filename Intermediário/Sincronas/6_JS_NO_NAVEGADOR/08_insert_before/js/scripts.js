let novoElemento = document.createElement("p");
let texto = document.createTextNode("Nayla");

novoElemento.appendChild(texto); //<p>Nayla</p>

let elementoAlvo = document.querySelector("#titulo-principal");
let elementoPai = document.querySelector("#container-principal");

elementoPai.insertBefore(novoElemento, elementoAlvo);


console.log(document.body);


