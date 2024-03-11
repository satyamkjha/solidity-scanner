import axios from "axios";

export const API_URL_PROD = process.env.REACT_APP_API_URL_PROD;
export const API_URL_DEV = process.env.REACT_APP_API_URL_DEV;

const API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
});

export const PUBLIC_API = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? API_URL_PROD : API_URL_DEV,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default API;
