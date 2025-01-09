class Produto{
    constructor(nome, preco,quantidade){
    this.nome = nome;
    this.preco = preco;
    this.quantidade =  quantidade;
    }

    notaFiscal(){
        return console.log("Produtos vendidos:", this.nome, this.preco, this.quantidade)
    }
}

const produto = new Produto("Caneta", 5.00, 10);
produto.notaFiscal();

const produto2 = new Produto("lapis", 1.00, 100);
produto2.notaFiscal();

const produto3 = new Produto("borracha", 5.00, 10);
produto3.notaFiscal();

class ProdutoAlimenticio extends Produto{
    _marca
    constructor(nome, preco, quantidade, dataValidade){
    super(nome,preco)
        this.nome = nome;
        this.preco = preco;
        this.quantidade = quantidade;
        this.dataValidade = dataValidade;
        this._marca = this._marca;
    }

    get marca(){
        return this.marca;
    }

    detalhesProduto(){
        return console.log("Produtos alimenticios:", this.nome, this.preco, this.quantidade, this.dataValidade, this.id);
    }

}

const cafe = new ProdutoAlimenticio("café", 5.00, 10, "12/12/2026", );
cafe.detalhesProduto();
