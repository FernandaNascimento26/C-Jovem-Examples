let a = document.querySelector("footer a");

console.log(a.getAttribute('href'));

let link = 'https://atlanticoavanti.ensinio.com/g/capacita-brasil-desenvolvimento-full-stack/community';

a.setAttribute('href', link);

console.log(a.getAttribute('href'));