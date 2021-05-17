import axios from 'axios';
import { authenticationService } from 'src/api/authenticationService';

const SERVER_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const server = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

server.interceptors.request.use((config) => {
  if (authenticationService.currentUserValue) {
    const { token } = authenticationService.currentUserValue;
    if (token) {
      const newConfig = config;
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default server;
