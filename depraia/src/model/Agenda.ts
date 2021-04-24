import User from "./User";

export interface Agenda {
    data: Date;
    id: string;
    vagas: number;
    usuarios: User[];
}