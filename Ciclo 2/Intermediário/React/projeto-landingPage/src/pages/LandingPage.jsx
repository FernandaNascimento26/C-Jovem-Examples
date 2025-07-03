import {useRef} from 'react';
import Navbar from '../components/Navbar';
import SobreMim from './SobreMim';

function LandingPage() {

  const homeRef = useRef(null);
  const sobreRef = useRef(null);
  const contatoRef = useRef(null);

  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToSobre = () => {
    sobreRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContato = () => {
    contatoRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>

    <Navbar
      scrollToHome={scrollToHome}
      scrollToSobre={scrollToSobre}
      scrollToContato={scrollToContato}
    />

    <section ref={homeRef}>
    <h1>Home</h1>
      <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
    </section>

     <section ref={sobreRef}>
      <SobreMim />
    </section>

     <section ref={contatoRef}>
    <h1>Contatos</h1>
      <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
       <p>Bem-vindo ao nosso site! Navegue pelas páginas acima.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in porta justo. Donec non dolor ac justo iaculis tincidunt. Nulla vitae purus non nisl laoreet efficitur. Sed convallis, orci nec porta egestas, neque felis dapibus est, sed vulputate augue mi vel nulla. Morbi tincidunt orci at viverra varius. Integer nec justo eget arcu tristique gravida. Proin dapibus sem in mattis posuere.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
      <p>Aliquam erat volutpat. Integer nec hendrerit ipsum. Vestibulum vel nibh sit amet justo feugiat ullamcorper. Nulla tincidunt lacus vitae lacinia malesuada. Suspendisse potenti. Sed vel varius quam. In lobortis vel lacus at efficitur. Mauris non sodales nisi. Etiam vel sapien ut eros tincidunt dignissim nec a urna.</p>
    </section>
    </>
  );
}

export default LandingPage;