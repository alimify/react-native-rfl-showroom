import axios from 'axios'
import storage from './asyncStorage'
import Constants from "expo-constants";




const access_token = '',
  self_token = Constants.deviceId


var axiosInstance = axios.create({
  baseURL: 'http://103.106.237.112:8080/samnuxt/secure/'
});

axiosInstance.defaults.headers.common["Content-Type"] = "application/json";



class axioInstance {

  private axios
  private self_token
  private params
  private method

  constructor(axios, self_token) {
    this.axios = axios
    this.self_token = self_token
  }

  async get(uri, info) {
    this.params = info
    this.method = 'get'
    const params = this.mergeParams()

    const token = await storage.get('token')
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    console.log(uri,params,'thegetmethod')

    return await this.axios.get(uri, params)
  }

  async post(uri, info) {
    this.params = info
    this.method = 'post'
    const params = this.mergeParams()
    
    const token = await storage.get("token");
    this.axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    console.log(params,info,'thepostmethod')

    return await this.axios.post(uri, params);
  }

  mergeParams() {
    let params
    if (this.method == 'get') {

      const exitingParams = this.params && this.params.params ? this.params.params : {}

      params = {
        params: {
          ...exitingParams,
          ...{
            self_token: this.self_token
          }
        }
      }
    } else if (this.method == 'post') {
       params = {
        ...this.params,
        ...{
          self_token: this.self_token
        }
      }
    }
    return params
  }


}


export default new axioInstance(axiosInstance, self_token);