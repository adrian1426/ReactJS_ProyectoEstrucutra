import axios from 'axios';

class CompanyServices {

  constructor() {
    if (!!CompanyServices.instance) {
      return CompanyServices.instance;
    }

    CompanyServices.instance = this;

    return this;
  }

  apiCompany = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/companies`;

  getCompanies = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiCompany}/?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getCompanyId = async (countryId, companyId) => {
    try {
      const response = await axios.get(`${this.apiCompany}/${companyId}/?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  addCompany = async (countryId, data) => {
    try {
      const response = await axios.post(`${this.apiCompany}/?country=${countryId}`, { data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  editCompany = async (countryId, companyId, data) => {
    try {
      const response = await axios.put(`${this.apiCompany}/${companyId}/?country=${countryId}`, { data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  deleteCompany = async (countryId, companyId, idUserEdit) => {
    try {
      const data = { isDeleted: true, idUserEdit, isActive: false };
      const response = await axios({ method: 'DELETE', url: `${this.apiCompany}/${companyId}/?country=${countryId}`, data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

}

export default CompanyServices;