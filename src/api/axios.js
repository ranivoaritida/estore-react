import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Set default headers (optional)
  },
  withCredentials: true, // Include cookies in requests (optional)
});