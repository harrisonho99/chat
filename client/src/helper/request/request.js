import axios from 'axios';
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
const publicRequest = axios.create({
  baseURL: 'http://localhost:4000/public/',
});


const privateRequest = (token) => {
  return axios.create({
    baseURL: "http://localhost:4000",
    // headers: {
    //   'Authorization': 'Bearer ' + token,
    //   'Content-Type': 'application/json',
    // },
  })
}

publicRequest.defaults.timeout = 10000;
export { publicRequest, privateRequest };
