import Endereco from "./Endereco";

export default class NewPraia {
    constructor(
        nome: string,
        endereco: Endereco,
      ) {
        this.nome = nome;
        this.endereco = endereco;
      }
      
    nome: string;
    endereco: Endereco;
}