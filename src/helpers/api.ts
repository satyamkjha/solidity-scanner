import axios from "axios";
import Auth from "./auth";
// import Auth from './auth';

export const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;
export const API_URL_DEV = process.env.REACT_APP_API_URL_DEV;

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: Auth.isUserAuthenticated(),
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export default API;
