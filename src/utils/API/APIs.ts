import { store } from "../../redux/store";
import { axiosFormInstance, axiosInstance } from "./axiosInstances";

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  const localToken = localStorage.getItem("tezdealz_ad_jwt");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    config.headers.Authorization = "Bearer " + localToken;
  }

  return config;
});
axiosFormInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  const localToken = localStorage.getItem("tezdealz_ad_jwt");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    config.headers.Authorization = "Bearer " + localToken;
  }

  return config;
});

export const addData = async (endpoint: string, requestBody?: object) => {
  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const addFormData = async (endpoint: string, requestBody?: object) => {
  try {
    const result = await axiosFormInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateData = async (endpoint: string, requestBody?: object) => {
  try {
    const result = await axiosInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateFormData = async (
  endpoint: string,
  requestBody?: object
) => {
  try {
    const result = await axiosFormInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const result = await axiosInstance.delete(endpoint);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getData = async (url: string) => {
  try {
    let result = await axiosInstance.get(url);
    return result;
  } catch (error: any) {
    return error;
  }
};
