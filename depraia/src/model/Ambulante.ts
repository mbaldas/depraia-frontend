import Endereco from "./Endereco";
import { Praia } from "./Praia";
import User from "./User";

export interface PraiaId {
  id: string;
}

export interface AmbulanteAsUser {
  cpf: string,
  email: string,
  endereco: Endereco,
  nome: string,
  tipo: number,
  senha: string
}

export interface Ambulante {
  id: string;
  user: User;
  praia: Praia;
}

export default class NewAmbulante {
  constructor(
      user: AmbulanteAsUser,
      praia: PraiaId
    ) {
      this.user = user
      this.praia = praia
    }
  user: AmbulanteAsUser

  praia: PraiaId;
}