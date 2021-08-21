import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import Cookies from "js-cookie";
import qs from "qs";

const instance = applyCaseMiddleware(
  axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { indices: false });
    },
    // timeout: 10000,
  })
);

export const setHeaders = (key: any, value: any) => {
  if (value) {
    instance.defaults.headers.common[key] = value;
  } else {
    delete instance.defaults.headers.common[key];
  }
};

if (Cookies.get("jwt_accessToken")) setHeaders("Authorization", "Bearer " + Cookies.get("jwt_accessToken"));

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log("Error", error.message);
    }
    // console.log(error.config);

    return Promise.reject(error);
  }
);

export default instance;
