import axios from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export default function createIndex(type: string, preprocess: string[]) {
  return axios.post(`/createIndex/${type}`, { preprocess }).catch((err) => {
    throw new Error(err.response.data);
  });
}
