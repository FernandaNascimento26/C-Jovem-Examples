let novoElemento = document.createElement("h2");
let texto = document.createTextNode("Carlos Jeferson");

novoElemento.appendChild(texto);

let heading = document.querySelector('#titulo-principal');
let paiHeading = heading.parentNode;

paiHeading.replaceChild(novoElemento, heading);