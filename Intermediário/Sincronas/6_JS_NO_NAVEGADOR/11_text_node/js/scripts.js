let pSemTexto = document.getElementById("sem-texto");
let nome = prompt("Digite seu nome:");

let texto = document.createTextNode(nome);

pSemTexto.appendChild(texto);