import { decorate, action, observable } from "mobx";
import axios from '../services/axios'

class Home {


  ///STATE
  INDEX = false;
  JUST_FOR_YOU = false


  ///SETTERS
  setIndex(data) {
   return this.INDEX = data
  }

  setJustForYou(data) {
    return this.JUST_FOR_YOU = data
  }


  ///GETTERS

  async fetchIndex(params = {}) {
    const response = await axios.get('api/home/index', {
      params: params
    })
    return this.setIndex(response.data)
  }


  async fetchJustForYou(info) {
    const response = await axios.get('api/home/justForYou', {
      params: info
    })

    return this.setJustForYou(response.data)
  }

}

decorate(Home, {

  //STATES
  INDEX: observable,
  JUST_FOR_YOU: observable,

  //SETTERS
  setIndex: action,
  setJustForYou: action,

  //GETTERS
  fetchIndex: action,
  fetchJustForYou: action,
});

export default new Home();
