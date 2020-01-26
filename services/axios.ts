import axios from 'axios'
// import config from "../config";


// const access_token = typeof context.packages.user.token !== 'undefined' ? context.packages.user.token.access_token : false,
//   self_token = context.packages.self_token

var axiosInstance = axios.create({
  baseURL: 'https://rflbestbuy.com/secure/',
});

// axiosInstance.defaults.headers.common['Authorization'] = "Bearer " + access_token;
// axiosInstance.defaults.headers.common['Content-Type'] = "application/json";
//axiosInstance.defaults.params['self_token'] = self_token
export default axiosInstance