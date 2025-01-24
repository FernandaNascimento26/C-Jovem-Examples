# 🚀 Como Criar Ancoras e Links no React com `react-router-dom`

Este guia ensina como criar um sistema de navegação no React que combina **âncoras** (para rolar dentro da mesma página) e **links entre páginas** usando `react-router-dom`.

---

## 📌 **1. Instalar o React Router**
Se ainda não tiver o `react-router-dom` instalado, execute:

```sh
npm install react-router-dom
```

---

## 📌 **2. Criar a Navbar com Links e Âncoras**
A Navbar precisa suportar **links entre páginas** e **âncoras para seções da Home**. Para isso, usamos:
- **`<a href='#id'>`** → Para navegar dentro da mesma página.
- **`<Link to='/pagina'>`** → Para navegar entre páginas do React.

### 📝 **Código da Navbar (`Navbar.jsx`)**

```jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleAnchorClick = (section) => {
    navigate("/"); // Garante que estamos na Home antes de rolar
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
        {/* Âncoras para a Home */}
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
```

---

## 📌 **3. Configurar o React Router (`App.jsx`)**
O `react-router-dom` precisa estar configurado para suportar **múltiplas páginas**. Criamos rotas para **Home, Blog e Sobre Nós**.

### 📝 **Código do `App.jsx`**

```jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Sobre from "./pages/Sobre";
import Footer from "./components/Footer";
import { useEffect } from "react";
import "./styles/styles.css";

// Garante que as âncoras funcionem corretamente ao navegar
const ScrollToHashElement = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);
  return null;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToHashElement />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
```

---

## 📌 **4. Criar a Página Home e Fazer o Scroll para as Seções**
A `Home` precisa rolar automaticamente até a seção correta ao carregar.

### 📝 **Código do `Home.jsx`**

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import StateSection from "../components/StateSection";
import ContactSection from "../components/ContactSection";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <StateSection />
      <ContactSection />
    </div>
  );
};

export default Home;
```

---

## ✅ **Explicação das Funções Criadas**
- **`handleAnchorClick(section)`** → Navega para a Home e rola suavemente até a seção correspondente.
- **`ScrollToHashElement`** → Detecta mudanças na URL com `#id` e faz scroll automático até o elemento correspondente.
- **`useEffect` no `Home.jsx`** → Ao carregar a página, verifica se há uma âncora e rola para a seção correta.

---

## ✅ **Resumo do Funcionamento**
✔️ **Âncoras (`<a href="#id">`) para navegar dentro da Home**  
✔️ **Links (`<Link to="/pagina">`) para mudar de página sem recarregar**  
✔️ **O `useEffect` no `Home.jsx` rola até a âncora correta ao voltar para a Home**  
✔️ **O `ScrollToHashElement` no `App.jsx` garante que a navegação funcione corretamente**  





