import axios from "axios";
import { Produto } from "../model/Produto";
import NewProduto from "../model/NewProduto";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async getAll() {
    const response = await axios.get('https://depraia-api.herokuapp.com/produto/todos');
    return response.data;
  },
  async createProduto(produto: NewProduto) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/produto`, JSON.stringify(produto))
    return response.data;
  },
};
