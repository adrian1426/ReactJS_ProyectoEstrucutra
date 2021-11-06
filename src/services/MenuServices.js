import axios from 'axios';

class MenuServices {

  constructor() {
    if (!!MenuServices.instance) {
      return MenuServices.instance;
    }

    MenuServices.instance = this;

    return this;
  }
  apiMenu = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/customer-information/menus`;

  getMenus = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiMenu}/?country=${countryId}`);
      return response;
    }
    catch (error) {
      return error.response;
    }
  };
}

export default MenuServices;