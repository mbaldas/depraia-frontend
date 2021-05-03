import axios from "axios";
import NewQuiosque from "../model/NewQuiosque";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createQuiosque(quiosque: NewQuiosque) {
    debugger;
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/quiosque`, JSON.stringify(quiosque))
    return response;
  },
};
