import axios, { AxiosInstance } from "axios";

class RijksService {
  rijksApi: AxiosInstance;
  constructor() {
    this.rijksApi = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/artObj`,
      withCredentials: true,
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

  getAllFavs() {
    const pr = this.rijksApi
      .get("/getAllFavs")
      .then((response) => response.data)
      .catch((err) => console.log("RijksService - getAllFavs error => ", err));
    return pr;
  }
}

const rijksService = new RijksService();

export default rijksService;
