import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaUsuarios from "./pages/ListaUsuarios"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  
  return(
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/usuarios" element={<ListaUsuarios/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>

  );
  

}

export default App
