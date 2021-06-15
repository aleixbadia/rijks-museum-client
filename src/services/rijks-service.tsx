import axios, { AxiosInstance } from "axios";

class RijksService {
  rijksApi: AxiosInstance;
  constructor() {
    this.rijksApi = axios.create({
      baseURL: `https://www.rijksmuseum.nl/api/en/collection`,
      withCredentials: false,
    });
  }

  getAll() {
    const pr = this.rijksApi
      .get("?key=1cGiJiKL&p=16&ps=16")
      .then((response) => response.data)
      .catch((err) => console.log("RijksService - getAll error => ", err));
    return pr;
  }

  getByObjectNumber(id: string) {
    const pr = this.rijksApi
      .get(`/${id}?key=1cGiJiKL`)
      .then((response) => response.data)
      .catch((err) => console.log("RijksService - getById error => ", err));
    return pr;
  }
}

const brandService = new RijksService();

export default brandService;
