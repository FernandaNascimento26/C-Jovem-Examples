

function CardProdutos({ nomeProduto, preco }) {

    return (


        <div className="card p-3 shadow-sm">
            <div className="d-flex align-items-center">
                <img src={foto} alt={nomeProduto} className="me-3" />
            </div>
            <div>
                <h3 className="mb-1">{nomeProduto}</h3>
                <p className="mb-0">R$ {preco}</p>
            </div>
        </div>

    );

}

export default CardProdutos;