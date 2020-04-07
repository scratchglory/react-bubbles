import axios from "axios";

export const axiosWithAuth = () => {
  // get the token from localStorage
  const token = window.localStorage.getItem("token");
  // create a new 'instance' of axios with the config obj built into it
  return axios.create({
    headers: { authorization: token },
    // baseURL can use the base url globally
    baseURL: "http://localhost:5000"
  });
};
