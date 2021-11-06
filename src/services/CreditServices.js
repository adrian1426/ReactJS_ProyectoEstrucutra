import axios from 'axios';

class CreditServices {
  constructor() {
    if (!!CreditServices.instance) {
      return CreditServices.instance;
    }
    CreditServices.instance = this;
    return this;
  }

  apiCredit = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/`;
  //Visacion
  getVisaCredits = async (countryId, data,status) => {
    try {
      const body = {
        body:  {
          filters:data
        } 
      };
      const response = await axios.post(`${this.apiCredit}visacion/filter?status=${status}&country=${countryId}&pageSize=10`,body);
      return response;
    } catch (error) {
      return error.response;
    }
  };
  //endVisacion
}
export default CreditServices;