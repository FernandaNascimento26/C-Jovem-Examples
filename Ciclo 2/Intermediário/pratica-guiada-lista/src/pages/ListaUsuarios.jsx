import {useState, useEffect} from 'react';
import CardUsuario from '../components/CardUsuario';
import { usuarios as dadosMock } from '../data/usuario_mock';

function ListaUsuarios (){

    const [usuarios, setUsuarios] = useState ([]);
    const [carregando, setCarregando] = useState (true);

    useEffect(() =>{

        setTimeout(() =>{

            setUsuarios(dadosMock);
            setCarregando(false);

        },1000)

    },[])


    return(

        <div>
            <h1 className="mb-4">Lista de usuarios</h1>
            {carregando ? ( <p>carregando usuarios...</p> ): ( 
                usuarios.map(usuario => (
                    <CardUsuario
                    key={usuario.id} 
                    nome={usuario.nome}
                    idade={usuario.idade}
                    email={usuario.email}
                    cidade={usuario.cidade}
                    foto={usuario.foto}   
                    />
                ))
            ) }
        </div>

    );



}

export default ListaUsuarios;
