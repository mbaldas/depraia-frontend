import { Praia } from "./Praia";

export default class NewAgenda {
    constructor(
    data: string,
    praia: Praia, 
    vagas: number
    ){
        this.data = data;
        this.praia = praia;
        this.vagas = vagas;
      }

      data: string;
      praia: Praia;
      vagas: number;
}