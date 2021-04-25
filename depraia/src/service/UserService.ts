import axios from "axios";
import User from "../model/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createUser(user: User) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/cadastro`, JSON.stringify(user))
    return response.data;
  },
};
