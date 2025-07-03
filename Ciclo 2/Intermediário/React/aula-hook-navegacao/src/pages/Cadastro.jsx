import { useState } from "react";
import {useNavigate} from "react-router-dom";


function Cadastro() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Usuário ${nome} cadastrado com sucesso!`);

        navigate("/login");
    };

  return (
    <> 
        <h1>Cadastro de usuários</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input 
                type="text"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                required
                />
            </div>
             <div>
                <label>Email:</label>
                <input 
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
            </div>
            <button>Cadastrar</button>
        </form>
    </>
  );

}


export default Cadastro;