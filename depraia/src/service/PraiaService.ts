import axios from "axios";
import NewPraia from "../model/NewPraia";

export default {
  async getAll() {
    const response = await axios.get('https://depraia-api.herokuapp.com/praia/todos');
    return response.data;
  },
  async createPraia(praia: NewPraia) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/praia`, JSON.stringify(praia))
    console.log(response);
    return response.data;
  },
};
