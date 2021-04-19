import axios from "axios";

export default {
  async getAll() {
    const response = await axios.get('https://depraia-api.herokuapp.com/praia/todos');
    return response.data;
  },
};
