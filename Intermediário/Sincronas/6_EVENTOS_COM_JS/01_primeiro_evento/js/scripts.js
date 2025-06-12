let btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let nome = prompt("Qual é o seu nome?");
  let p = document.createElement("p");
  p.textContent = `Olá,${nome}, Bem vindo(a)`;
  document.body.appendChild(p);
});