import axios from "axios";
import { API_BASE_URL } from "@env";

const apiState = axios.create({
  baseURL: `${API_BASE_URL}`,
});

apiState.interceptors.request.use((request) => {
  console.log("API CALLING => ", JSON.stringify(request));
  return request;
});
apiState.defaults.headers.common["Authorization"] = "Auth Token";

export default apiState;
