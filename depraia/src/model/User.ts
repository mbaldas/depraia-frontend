import Endereco from "./Endereco";

export default class User {
    constructor(
        cpf: string,
        email: string,
        nome: string,
        senha: string,
        tipoUsuario: number,
        endereco: Endereco,
      ) {
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario;
        this.endereco = endereco;
      }

    cpf: string;
    email: string;
    nome: string;
    senha: string;
    tipoUsuario: number;
    endereco: Endereco;
}