import { Praia } from "./Praia";
import User from "./User";

export interface Ambulante {
    id: string;
    user: User;
    praia: Praia;
}