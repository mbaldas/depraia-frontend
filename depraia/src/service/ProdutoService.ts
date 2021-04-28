import axios from "axios";
import Produto from "../model/Produto";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createProduto(produto: Produto) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/produto`, JSON.stringify(produto))
    return response.data;
  },
};
