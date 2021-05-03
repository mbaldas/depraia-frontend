import axios from "axios";
import NewAmbulante from "../model/Ambulante";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async addProduto(produtoId: number, id: number) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/adicionar/produto/${id}`, JSON.stringify(produtoId))
    return response.data;
  },
  async createAmbulante(ambulante: NewAmbulante) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/ambulante`, JSON.stringify(ambulante))
    return response.data;
  },
};
