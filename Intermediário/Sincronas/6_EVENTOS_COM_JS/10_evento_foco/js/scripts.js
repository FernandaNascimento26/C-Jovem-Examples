let input = document.querySelector("#input1");

input.addEventListener("focus", function() {

 alert("Não digite nada aí!");

});

input.addEventListener("blur", function() {

  console.log("Concluiu a digitação");

});