import axios from "axios";

// Create an Axios instance with default config
export const apiClient = axios.create({
  baseURL: "/api", // Since your APIs are under /api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request/response interceptors for auth, error handling, etc.
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    // const token = getToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, e.g., 401, 500
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  },
);
