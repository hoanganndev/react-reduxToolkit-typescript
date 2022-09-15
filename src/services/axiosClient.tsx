import axios from "axios";

const instance_reqres = axios.create({
  baseURL: "https://reqres.in",
});
const instance_jsonplaceholder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// instance_reqres interceptor
instance_reqres.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      return error.response;
    }
  }
);

// instance_jsonplaceholder interceptor
instance_jsonplaceholder.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      return error.response;
    }
  }
);

export { instance_reqres, instance_jsonplaceholder };
