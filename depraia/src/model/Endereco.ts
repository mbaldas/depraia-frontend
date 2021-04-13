export default class Endereco {
    constructor(
        rua: string,
        bairro: string,
        cidade: string,
        cep: string,
      ) {
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
      }
    bairro: string;
    cidade: string;
    cep: string;
    rua: string;
}