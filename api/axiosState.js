import axios from "axios";
import { API_BASE_URL } from "@env";
import StorageService from "../utils/StorageService";

const apiState = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiState.interceptors.request.use(async (request) => {
  await StorageService.getAuthTokenFromStorage()
    .then((response) => {
      var token = null;
      if (response) {
        token = response.trim().replaceAll('"', "");
        request.headers.Authorization = `Bearer ${token}`;
      }
    })
    .catch((error) => {
      console.log(
        "Error occured while checking if authTokkn is available in localstorage",
        error
      );
    });
  return request;
});

export default apiState;
