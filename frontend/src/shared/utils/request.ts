import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_API as string;
const timeout = 1000;
const headers = { 'Content-Type': 'application/json' };

const request = axios.create({
  baseURL,
  timeout,
  headers,
});

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default request;
