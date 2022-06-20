import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { NO_COMMS_ERROR } from '../const';

const BACKEND_URL = 'https://guitar-shop.accelerator.pages.academy/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (onServerStatusUpdate: (num: number) => void): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => {
      onServerStatusUpdate(response.status);
      return response;
    },

    (error: AxiosError) => {
      const {response} = error;

      if (!response) {
        return onServerStatusUpdate(NO_COMMS_ERROR);
      }

      if (response && response.status >= 500) {
        return onServerStatusUpdate(response.status);
      }

      return Promise.reject(error);
    },
  );

  return api;
};
