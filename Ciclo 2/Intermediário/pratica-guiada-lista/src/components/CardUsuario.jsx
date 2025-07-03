import './CardUsuario.css'

function CardUsuario({nome, idade, email, cidade, foto }){

    return(

        
            <div className="card card-usuario p-3 shadow-sm">
                <div className="card-user d-flex align-items-center">
                    <img src={foto} alt={nome} className="me-3"/>
                </div>
                <div>
                    <h3 className="mb-1">{nome}</h3>
                    <p className="mb-0">{email}</p>
                    <p className="mb-0">{cidade}</p>
                    <p className="mb-0">{idade} anos</p>
                </div>
            </div> 
        

    );

}

export default CardUsuario;