import axios from 'axios';

class LoginServices {

  constructor() {
    if (!!LoginServices.instance) {
      return LoginServices.instance;
    }

    LoginServices.instance = this;
    return this;
  }

  apiLogin = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/customer-information/admin`;

  login = async (countryId, email) => {
    try {
      const config = {
        headers: {
          actionEvent: 'admin-login',
          descriptionEvent: 'inicio de sesión'
        }
      };

      const response = await axios.get(`${this.apiLogin}/login_admin/${email}?country=${countryId}`, config);
      return response;
    } catch (error) {
      return error.response;
    }
  };
}

export default LoginServices;