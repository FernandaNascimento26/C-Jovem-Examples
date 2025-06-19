import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Secao1 from "../components/Secao1";
import Secao2 from "../components/Secao2";
import Secao3 from "../components/Secao3";
import Secao4 from "../components/Secao4";
import Secao5 from "../components/Secao5";

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
      }, 100); // Pequeno delay para garantir que o DOM foi atualizado
    } else {
      window.scrollTo(0, 0); // Se não tiver hash, volta ao topo
    }
  }, [location]);


  return (
    <div>
      <Secao1 />
      <Secao2 />
      <Secao3 />
      <Secao4 />
      <Secao5 />
    </div>
  );
};

export default Home;
