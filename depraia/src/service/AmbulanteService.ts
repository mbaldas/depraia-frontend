import axios from "axios";
import NewAmbulante from "../model/Ambulante";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async addProduto(produtoId: object, id: number) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/ambulante/adicionar/produto/${id}`, JSON.stringify(produtoId))
    return response;
  },
  async createAmbulante(ambulante: NewAmbulante) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/ambulante`, JSON.stringify(ambulante))
    return response.data;
  },
  async getAmbulanteByUserId(id: number) {
    const response = await axios.get(`https://depraia-api.herokuapp.com/ambulante/${id}`)
    return response.data;
  },
};
