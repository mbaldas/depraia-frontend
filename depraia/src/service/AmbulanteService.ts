import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async addProduto(produtoId: number) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/adicionar/produto/`, JSON.stringify(produtoId))
    return response.data;
  },
};
