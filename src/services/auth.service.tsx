import axios, { AxiosInstance } from "axios";

class RijksService {
  rijksApi: AxiosInstance;
  constructor() {
    this.rijksApi = axios.create({
      baseURL: `http://localhost:5000/auth`,
      withCredentials: false,
    });
  }

  signup(username: string, password: string) {
    const pr = this.rijksApi
      .post("/signup", { username, password })
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - signup error => ", err));
    return pr;
  }

  login(username: string, password: string) {
    const pr = this.rijksApi
      .post("/login", { username, password })
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - login error => ", err));
    return pr;
  }

  logout() {
    const pr = this.rijksApi
      .get("/logout")
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - logout error => ", err));
    return pr;
  }

  me() {
    const pr = this.rijksApi
      .get("/me")
      .then((response) => response.data)
      .catch((err) => console.log("auth-service - me error => ", err));

    return pr;
  }
}

const brandService = new RijksService();

export default brandService;
