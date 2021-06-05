import axios from "axios";
// import Auth from './auth';

export const API_URL_PROD = `http://ec2-3-21-102-98.us-east-2.compute.amazonaws.com:8000/`;
export const API_URL_STAGING = ``;

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});

// API.interceptors.request.use((config: AxiosRequestConfig) => {
//   // eslint-disable-next-line no-param-reassign
//   config.headers['x-session-id'] = Auth.isUserAuthenticated()
//     ? Auth.getSessionId()
//     : '';
//   return config;
// });

export default API;
