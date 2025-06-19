window.addEventListener("keydown", function(e) {

   console.log( e.code);

  if(e.code == 'q') {
    console.log("Apertou a letra q");
  }

});

window.addEventListener("keyup", function(e) {

  console.log( e.key);

  if(e.key == "Enter") {
    console.log("Soltou o enter");
  }

});