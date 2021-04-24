import axios from "axios";
import User from "../model/User";

export default {
  async createUser(user: User) {
    console.log(user);
    const response = await axios.post(`https://depraia-api.herokuapp.com/usuario`, { user })
    return response.data;
  },
};
