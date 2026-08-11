import axios from "axios";
import {
  getToken,
  isTokenExpired,
  refreshAccessToken,
  logout
} from "./auth";

const api = axios.create({
  baseURL: "https://example.com/api"
});

// Request interceptor: attaches JWT to every request.
api.interceptors.request.use((config) => {
  let token = getToken();

  if (token && isTokenExpired(token)) {
    token = refreshAccessToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: handles unauthorized responses.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = refreshAccessToken();

      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      }

      logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
//cd experiment3-role-authentication