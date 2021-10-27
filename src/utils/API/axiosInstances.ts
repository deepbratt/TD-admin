import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem("tezdealz_ad_jwt"),
  },
});

export const axiosFormInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem("tezdealz_ad_jwt"),
  },
});
