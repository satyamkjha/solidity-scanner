import axios from "axios";
// import Auth from './auth';

export const API_URL_PROD = `http://127.0.0.1:8010/`;
export const API_URL_DEV = `http://127.0.0.1:8010/`;

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default API;
