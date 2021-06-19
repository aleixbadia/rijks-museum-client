import axios, { AxiosInstance } from "axios";

class UserService {
  rijksApi: AxiosInstance;
  constructor() {
    this.rijksApi = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/user`,
      withCredentials: true,
    });
  }

  addToFavs(artObjNum: string) {
    const pr = this.rijksApi
      .post("/addToFavs", { artObjNum })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log("UserService - addToFavs error => ", err));
    return pr;
  }

  deleteFromFavs(artObjNum: string) {
    const pr = this.rijksApi
      .post("/deleteFromFavs", { artObjNum })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log("UserService - deleteFromFavs error => ", err));
    return pr;
  }

  getByObjectNumber(id: string) {
    const pr = this.rijksApi
      .get(`/getByObjNum/${id}`)
      .then((response) => response.data)
      .catch((err) =>
        console.log("UserService - getByObjectNumber error => ", err)
      );
    return pr;
  }
}

const userService = new UserService();

export default userService;
