

export default class NewProduto {
    constructor(
        nome: string,
        descricao: string,
        preco: number
      ) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
      }

    nome: string;
    descricao: string;
    preco: number;

}