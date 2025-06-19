import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleAnchorClick = (section) => {
    navigate("/"); 
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <ul>
        {/* Âncoras da Home */}
        <li><a href="#s1" onClick={() => handleAnchorClick("s1")}>Início</a></li>
        <li><a href="#s2" onClick={() => handleAnchorClick("s2")}>Sobre o React</a></li>
        <li><a href="#s3" onClick={() => handleAnchorClick("s3")}>Por que usar?</a></li>
        <li><a href="#s4" onClick={() => handleAnchorClick("s4")}>Estado no React</a></li>
        <li><a href="#s5" onClick={() => handleAnchorClick("s5")}>Contato</a></li>

        {/* Links para outras páginas */}
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/sobre">Sobre nós</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
