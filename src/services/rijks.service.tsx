import axios, { AxiosInstance } from "axios";

class RijksService {
  rijksApi: AxiosInstance;
  constructor() {
    this.rijksApi = axios.create({
      baseURL: `http://localhost:5000/artObj`,
      withCredentials: false,
    });
  }

  getAll() {
    const pr = this.rijksApi
      .get("/getAllArtObj")
      .then((response) => response.data)
      .catch((err) => console.log("RijksService - getAll error => ", err));
    return pr;
  }

  getByObjectNumber(id: string) {
    const pr = this.rijksApi
      .get(`/getByObjNum/${id}`)
      .then((response) => response.data)
      .catch((err) => console.log("RijksService - getByObjectNumber error => ", err));
    return pr;
  }
}

const brandService = new RijksService();

export default brandService;
