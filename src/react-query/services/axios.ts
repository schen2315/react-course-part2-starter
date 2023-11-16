import axios from "axios";

function createAxiosObject(url: string) {
  return axios.create({ baseURL: url });
}

export default createAxiosObject;
