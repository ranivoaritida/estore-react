import axios from 'axios';
import { refreshRequest } from './authApi';

export const api = axios.create({
  baseURL: 'http://localhost:8080/', 
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers (optional)
  },
  withCredentials: true, // Include cookies in requests (optional)
});

let accessToken = null;
let isRefreshing = false;
let failedQueue = [];

export const setAccessToken = (token) => {
  accessToken = token;
};

api.interceptors.request.use( (config) => {
  if(accessToken){
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
})


const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    if (!accessToken) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return Promise.reject(error); // évite bug
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await refreshRequest();

        const newToken = res.data.token;

        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);

      } catch (err) {
        console.error("Error refreshing token:", err);
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);