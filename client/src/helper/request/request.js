import axios from 'axios';
const publicRequest = axios.create({ baseURL: 'http://localhost:4000/signup' });
export { publicRequest };
