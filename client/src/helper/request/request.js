import axios from 'axios';

const publicRequest = axios.create({
  baseURL: 'http://localhost:4000/public/',
});
const publicRequestMobile = axios.create({
  baseURL: 'http://192.168.30.107:4000/public/',
});

const privateRequest = (token) => {
  return axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
  })
}

publicRequest.defaults.timeout = 10000;
export { publicRequest, publicRequestMobile, privateRequest };
