import axios from 'axios';

class EmployeeServices {

  constructor() {
    if (!!EmployeeServices.instance) {
      return EmployeeServices.instance;
    }

    EmployeeServices.instance = this;

    return this;
  }

  apiEmployee = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/employees`;
  apiEmployeeFilter = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/filterEmployees`;
  apiPayments = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/payments`;
  apiRequests = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/requests/`;

  getEmployeesFilter = async (countryId, pageSize, filterData) => {
    try {
      const response = await axios.post(`${this.apiEmployeeFilter}/filter?country=${countryId}&pageSize=${pageSize}`, { body: filterData });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getEmployeesName = async (countryId, name) => {
    try {
      const response = await axios.post(`${this.apiEmployeeFilter}/filter/names?country=${countryId}`, { body: { name } });
      return response;
    } catch (error) {
      return error.response;
    }
  };


  uploadEmployees = async (countryId, idUser, file) => {
    try {
      const formData = new FormData();
      formData.append('idUser', idUser);
      formData.append('file', file);

      const response = await axios.post(
        `${this.apiEmployee}/?country=${countryId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      return response;
    } catch (error) {
      return error.response;
    }
  };

  editEmployee = async (countryId, employeeId, data) => {
    try {
      const response = await axios.put(`${this.apiEmployee}/${employeeId}?country=${countryId}`, { data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  deleteEmployee = async (countryId, employeeId, idUserEdit) => {
    try {
      const data = { data: { idUserEdit } };
      const response = await axios({ method: 'DELETE', url: `${this.apiEmployee}/${employeeId}?country=${countryId}`, data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getListDocuments = async (countryId, data) => {
    try {
      const pageSize = 10;
      const body = {
        body: {
          filters: data
        }
      };
      const response = await axios.post(`${this.apiRequests}filter?country=${countryId}&pageSize=${pageSize}`, body);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getDocumetsValidations = async (countryId, data) => {
    try {
      const pageSize = 10;
      const body = {
        body: {
          filters: data
        }
      }
      const response = await axios.post(`${this.apiRequests}employees/filter?country=${countryId}&pageSize=${pageSize}`, body);
      return response;
    } catch (error) {
      return error.response
    }
  };

  getDocumentUrl = async (countryId, uri, isValidation) => {
    try {
      const urlValidation = '/validation';//se agrega al URL cuando se esta tratando de obtener datos del modulo de validacion de documentos
      const response = await axios.post(`${this.apiRequests}documents${isValidation ? urlValidation : ''}?uri=${uri}&bucket=wallet-requests&country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  getEmployeeId = async (countryId, employeeId) => {
    try {
      const response = await axios.get(`${this.apiEmployeeFilter}/${employeeId}?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  payments = async (countryId, idTransaction, pageSize) => {
    try {
      const response = await axios.post(`${this.apiPayments}/${idTransaction}?country=${countryId}&pageSize=${pageSize}`, {});
      return response;
    } catch (error) {
      return error.response;
    }
  };

  sendEmailInvitation = async (countryId, receivers) => {
    try {
      const data = {
        data: {
          receivers
        }
      };

      const response = await axios.post(`${this.apiEmployee}/invitation/?country=${countryId}`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

}
export default EmployeeServices;