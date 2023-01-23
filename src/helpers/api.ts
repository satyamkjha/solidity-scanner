import axios from "axios";
import Auth from "./auth";
// import Auth from './auth';

export const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;
export const API_URL_DEV = process.env.REACT_APP_API_URL_DEV;

const API = axios.create({
  baseURL: "http://127.0.0.1:8010",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default API;
