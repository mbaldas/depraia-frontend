import axios from "axios";
import { Praia } from "../model/Praia";
import User from "../model/User";
import NewAgenda from "../model/NewAgenda";

export default {
  async getAll() {
    const response = await axios.get('https://depraia-api.herokuapp.com/agenda/todos');
    return response.data;
  },
  async putReserva(reserva: any, selectedPraia: Praia, actualUser: any) {
      const dateToBeCompared = reserva.data.format("YYYY-MM-DD");
      const agendaCerta = selectedPraia.agendas.filter(x => x.data === dateToBeCompared);
      const obj = {
        agendaId: agendaCerta[0].id,
        userId: actualUser.id
      }
      axios.defaults.headers = {
        'Content-Type': 'application/json'
      };
      const response = await axios.put(`https://depraia-api.herokuapp.com/agenda/reservar`, JSON.stringify(obj))
      return response.data;
  },
  async createAgenda(agenda: NewAgenda) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/agenda`, JSON.stringify(agenda))
    return response;
  }
};
