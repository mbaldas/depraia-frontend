import axios from "axios";
import User from "../model/User";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  async createUser(user: User) {
    console.log(user);
    user.admin = false;
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/cadastro`, JSON.stringify(user))
    return response.data;
  },
  async loginUser(user: any) {
    axios.defaults.headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(`https://depraia-api.herokuapp.com/login`, JSON.stringify(user))
    return response.data;
  }
};
