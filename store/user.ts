import { decorate, action, observable } from "mobx";
import axios from "../services/axios";

class User {
  ///STATES
  ACCOUNT = false;
  REGISTER = false;
  UPDATE_ACCOUNT = false;
  UPDATE_PASSWORD = false;
  UPDATE_BILLING_ADDRESS = false;
  ORDERS_HISTORY = false;
  SELF_DASHBOARD = false;
  SELF_TOKEN = "";
  PASSWORD_RESET_REQUEST = false;
  PASSWORD_RESET = false;

  //SETTERS
  setAccount(data) {
    return (this.ACCOUNT = data);
  }

  setRegister(data) {
    return (this.REGISTER = data);
  }
    
  setUpdateAccount(data) {
    return (this.UPDATE_ACCOUNT = data);
  }

  setUpdatePassword(data) {
    return (this.UPDATE_PASSWORD = data);
  }

  setUpdateBillingAddress(data) {
    return (this.UPDATE_BILLING_ADDRESS = data);
  }

  setOrdersHistory(data) {
    return (this.ORDERS_HISTORY = data);
  }

  setSelfDashboard(data) {
    return (this.SELF_DASHBOARD = data);
  }

  setSelfToken(data) {
    this.SELF_TOKEN = data;
  }

  setPasswordResetRequest(data) {
    this.PASSWORD_RESET_REQUEST = data;
  }

  setPasswordReset(data) {
    this.PASSWORD_RESET = data;
  }

  ///GETTERS

  async fetchRegister(info) {
    const response = await axios.post("api/auth/register", info);

    return this.setRegister(response.data);
  }

  async fetchAccount(info) {
    const response = await axios.get("api/user/account", {
      params: info
    });

    return this.setAccount(response.data);
  }

  async fetchUpdateAccount(info) {
    const response = await axios.post("api/user/updateAccount", info);

    return this.setUpdateAccount(response.data);
  }

  async fetchUpdatePassword(info) {
    const response = await axios.post("api/user/updatePassword", info);

    return this.setUpdatePassword(response.data);
  }

  async fetchUpdateBillingAddress(info) {
    const response = await axios.post("api/user/updateBillingAddress", info);

    return this.setUpdateBillingAddress(response.data);
  }

  async fetchOrdersHistory(info) {
    const response = await axios.get("api/user/orderHistory", {
      params: info
    });

    return this.setOrdersHistory(response.data);
  }

  async fetchSelfDashboard(info) {
    const response = await axios.get("api/user/selfDashboard", {
      params: info
    });

    return this.setSelfDashboard(response.data);
  }

  async fetchSelfToken(info) {
    return this.setSelfToken(info);
  }

  async fetchPasswordResetRequest(info) {
    const response = await axios.post("api/auth/passwordResetRequest", info);

    return this.setPasswordResetRequest(response.data);
  }

  async fetchPasswordReset(info) {
    const response = await axios.post("api/auth/passwordReset", info);

    return this.setPasswordReset(response.data);
  }
}

decorate(User, {});

export default new User();
