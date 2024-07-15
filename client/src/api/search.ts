import axios from "axios";
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export default function search(
  text: string,
  indexType: string,
  searchType: string
) {
  return axios
    .get(`/search/${searchType}/${indexType}/${text}`)
    .then((res) => res?.data?.suggestions)
    .catch((err) => {
      throw new Error(err.response.data);
    });
}
