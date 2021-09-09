import { store } from "../../redux/store";
import { axiosFormInstance, axiosInstance } from "./axiosInstances";

// const getHeaders = async()=>{
//   let headers =  {
//     Accept: 'application/json',
//     'Content-Type': 'multipart/form-data',
//     'Access-Control-Allow-Origin': '*',
//     Authorization: 'Bearer ' + localStorage.getItem('tdwadminjwt')
//   }
//   let token = await localStorage.getItem('tdwadminjwt')
//   headers['Authorization'] = "Bearer " + token
//   return headers
// }

axiosInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  const localToken = localStorage.getItem("tdwadminjwt");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    config.headers.Authorization = "Bearer " + localToken;
  }

  return config;
});
axiosFormInstance.interceptors.request.use(function (config) {
  const token = store.getState().auth.token;
  const localToken = localStorage.getItem("tdwadminjwt");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    config.headers.Authorization = "Bearer " + localToken;
  }

  return config;
});

export const addData = async (endpoint: string, requestBody?: object) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result.data;
  } catch (error: any) {
    return error;
  }
};
export const addFormData = async (endpoint: string, requestBody?: object) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosFormInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateData = async (endpoint: string, requestBody?: object) => {
  // const headers = await getHeaders()
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
  // const headers = await getHeaders()
  try {
    const result = await axiosFormInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};
export const deleteData = async (endpoint: string) => {
  // const headers = await getHeaders()
  try {
    const result = await axiosInstance.delete(endpoint);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getAllData = async (url: string) => {
  // const headers = await getHeaders()
  try {
    let result = await axiosInstance.get(url);
    if (result.status >= 200 || result.status <= 205) {
      return result.data;
    } else {
      return result;
    }
  } catch (error: any) {
    return error.response;
  }
};
