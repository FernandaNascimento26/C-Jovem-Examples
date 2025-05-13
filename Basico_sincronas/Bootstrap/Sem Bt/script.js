document.addEventListener('DOMContentLoaded', () => {
    // Carrossel
    const slides = document.querySelectorAll('.slide');
    const indicadores = document.querySelector('.indicadores');
    let currentSlide = 0;
  
    // Cria indicadores
    slides.forEach((_, i) => {
      const indicador = document.createElement('span');
      if (i === 0) indicador.classList.add('active');
      indicador.addEventListener('click', () => goToSlide(i));
      indicadores.appendChild(indicador);
    });
  
    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      document.querySelectorAll('.indicadores span')[currentSlide].classList.remove('active');
      
      currentSlide = (n + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      document.querySelectorAll('.indicadores span')[currentSlide].classList.add('active');
    }
  
    // Auto-play
    setInterval(() => goToSlide(currentSlide + 1), 5000);
  
    // Menu mobile
    const menuBtn = document.querySelector('.menu-mobile');
    const navLinks = document.querySelector('.nav-links');
  
    menuBtn.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
  });