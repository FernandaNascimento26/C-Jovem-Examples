import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Sobre Nós</h3>
          <p>Somos a Valeu Store, sua loja online de tecnologia. Qualidade e inovação para você!</p>
        </div>
        <div className="footer-column">
          <h3>Contato</h3>
          <p>Email: contato@valeustore.com</p>
          <p>Telefone: (85) 98765-4321</p>
          <p>Endereço: Rua das Inovações, 123 - Fortaleza, CE</p>
        </div>
        <div className="footer-column">
          <h3>Redes Sociais</h3>
          <p>Instagram | Facebook | Twitter</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Valeu Store - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
