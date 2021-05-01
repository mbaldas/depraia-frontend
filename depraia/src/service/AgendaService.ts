import axios from "axios";
import NewAgenda from "../model/NewAgenda";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createAgenda(agenda: NewAgenda) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/agenda`, JSON.stringify(agenda))
    return response.data;
  },
};
