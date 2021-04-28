import { Agenda } from "./Agenda";
import { Ambulante } from "./Ambulante";
import Endereco from "./Endereco";
import { Quiosque } from "./Quiosque";

export interface Praia {
    id: string;
    nome: string;
    endereco: Endereco;
    agendas: Agenda[];
    ambulantes: Ambulante[];
    quiosques: Quiosque[];
}