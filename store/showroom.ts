import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class Home {
  ///STATE
  DASHBOARD = false;
  SHIPMENT_INDEX = false;
  SHIPMENT_SHOW = false;
  SHIPMENT_STATUS = false;

  ///SETTERS
  setDashboard(data) {
    return (this.DASHBOARD = data);
  }

  setShipmentIndex(data) {
    return (this.SHIPMENT_INDEX = data);
  }

  setShipmentShow(data) {
    return (this.SHIPMENT_SHOW = data);
  }

  setShipmentStatus(data) {
    return (this.SHIPMENT_STATUS = data);
  }

  ///GETTERS

  async fetchDashboard(params = {}) {
    const response = await axios.get("api/showroom/dashboard", {
      params: params
    });
    return this.setDashboard(response.data);
  }

  async fetchShipmentIndex(info) {
    const response = await axios.get("api/showroom/shipment/index", {
      params: info
    });

    return this.setShipmentIndex(response.data);
  }

  async fetchShipmentShow(info) {
    const response = await axios.get("api/showroom/shipment/show", {
      params: info
    });

    return this.setShipmentShow(response.data);
  }

  async fetchShipmentStatus(info) {
    const response = await axios.get("api/showroom/shipment/status", {
      params: info
    });

    return this.setShipmentStatus(response.data);
  }
}

decorate(Home, {
  //STATES
  DASHBOARD: observable,
  SHIPMENT_INDEX: observable,
  SHIPMENT_SHOW: observable,
  SHIPMENT_STATUS: observable,

  //SETTERS
  setDashboard: action,
  setShipmentIndex: action,
  setShipmentShow: action,
  setShipmentStatus: action,

  //GETTERS
  fetchDashboard: action,
  fetchShipmentIndex: action,
  fetchShipmentShow: action,
  fetchShipmentStatus: action
});

export default new Home();
