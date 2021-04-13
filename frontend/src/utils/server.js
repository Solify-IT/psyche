import axios from 'axios';

const user = JSON.parse(localStorage.getItem('currentUser')) || '';

const server = axios.create({
  headers: {
    Authorization: `Bearer ${user.token}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default server;
