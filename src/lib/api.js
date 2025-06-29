import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apikunmac-99be98432e46.herokuapp.com/api/',
  timeout: 30000,
});

export default api; 