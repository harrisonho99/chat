import axios from 'axios';
const publicRequest = axios.create({
  baseURL: 'http://localhost:4000/public/',
});
const publicRequestMobile = axios.create({
  baseURL: 'http://192.168.30.107/public/',
});

publicRequest.defaults.timeout = 10000;
export { publicRequest, publicRequestMobile };
