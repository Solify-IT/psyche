import axios from 'axios';

const user = JSON.parse(localStorage.getItem('currentUser')) || '';
const SERVER_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const server = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${user.token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default server;
