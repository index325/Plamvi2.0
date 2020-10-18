import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.plamvi.com.br',
});

export default api;
