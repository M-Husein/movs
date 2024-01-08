import { HttpError } from "@refinedev/core";
import axios from "axios";

const httpRequest = axios.create();

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const customError: HttpError = {
      ...err,
      message: err.response?.data?.message || err.message,
      statusCode: err.response?.status,
    };

    return Promise.reject(customError);
  },
);

export { httpRequest };
