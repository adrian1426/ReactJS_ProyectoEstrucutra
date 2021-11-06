import axios from 'axios';

class UserServices {

  constructor() {
    if (!!UserServices.instance) {
      return UserServices.instance;
    }

    UserServices.instance = this;

    return this;
  }

  apiUser = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/customer-information/users`;
  apiUserMock = 'https://walletahh.mocklab.io/customer-information/users';

  getUsers = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiUserMock}?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  addUser = async data => {
    try {
      const response = await axios.post(`${this.apiUser}/admin`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  editUser = async (userId, data) => {
    try {
      const response = await axios.put(`${this.apiUser}/${userId}`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  };

}

export default UserServices;