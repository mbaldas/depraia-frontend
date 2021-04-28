import { Praia } from "./Praia";

export default class NewQuiosque {
    constructor(
    nome: string,
    praia: Praia
    ){
        this.nome = nome;
        this.praia = praia;
      }

      nome: string;
      praia: Praia
}