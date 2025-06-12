/*window.addEventListener("load", function() {
    alert("Assine os nossos termos de uso");
 });*/

 
 window.addEventListener("beforeunload", function(e) {
  e.returnValue = null;
});
