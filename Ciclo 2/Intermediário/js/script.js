let login;
let senha;

/*
console.log(typeof(nome));
console.log(typeof(idade));
console.log(typeof(altura));
console.log(typeof(casado));
console.log(typeof(filhos));
console.log(typeof(endereco));
console.log(typeof(teste));

*/

login = prompt("Digite seu login");
senha = prompt("Digite sua senha");

if (login === "Luca@mail.com" || senha === "123456"){
    alert("Bem vindo");
}
else {
    alert("Login e senha corretos");
}
