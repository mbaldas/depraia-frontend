/* aqui é a camada de serviço para podermos fazer a chamada get para o json
e trazer os dados para montarmos a lista*/

import axios from "axios";
import User from "../model/User";

export default {
  async createUser(user: User) {

    const decider = () => {
      switch(user.tipoUsuario) {
        case 0:
          return "banhista"
        case 1:
          return "esportista"
        case 2:
          return "ambulante"
      }
    }
    const requestTo = decider();
    const response = await axios.post(`https://depraia-api.herokuapp.com/${requestTo}`, { user })
    return response.data;
  },
};
