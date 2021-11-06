import axios from 'axios';

class CatalogServices {

  constructor() {
    if (!!CatalogServices.instance) {
      return CatalogServices.instance;
    }

    CatalogServices.instance = this;

    return this;
  }

  apiEmployeesFilter = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/filterEmployees`;

  getUserStatus = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiEmployeesFilter}/user/status?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

}

export default CatalogServices;