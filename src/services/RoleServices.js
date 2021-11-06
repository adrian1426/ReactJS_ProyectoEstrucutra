import axios from 'axios';

class RoleServices {

  constructor() {
    if (!!RoleServices.instance) {
      return RoleServices.instance;
    }

    RoleServices.instance = this;
    return this;
  }

  apiRole = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/customer-information/roles`;

  getRoles = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiRole}/?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getRolesById = async (countryId, rolId) => {
    try {
      const response = await axios.get(`${this.apiRole}/${rolId}?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  addRol = async (data, countryId) => {
    try {
      const response = await axios.post(`${this.apiRole}/?country=${countryId}`, { data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  editRol = async (profileId, data, countryId) => {
    try {
      const response = await axios.put(`${this.apiRole}/${profileId}?country=${countryId}`, { data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  deleteRol = async (profileId, countryId) => {
    try {
      const data = { isDeleted: true, isActive: false };
      const response = await axios({ method: 'DELETE', url: `${this.apiRole}/${profileId}/?country=${countryId}`, data });
      return response;
    } catch (error) {
      return error.response;
    }
  };
}

export default RoleServices;