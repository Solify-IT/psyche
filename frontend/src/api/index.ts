import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function apiGet<T>(path: string) : Promise<T> {
  const result = await (await instance.get(`${path}`)).data;
  return result;
}

async function apiPost<T>(path: string, data: any) : Promise<T> {
  const result = await (await instance.post(`${path}`, data)).data;
  return result;
}

export { apiGet, apiPost };
