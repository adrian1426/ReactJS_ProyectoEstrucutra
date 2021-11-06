import axios from 'axios';

class ProductServices {

  constructor() {
    if (!!ProductServices.instance) {
      return ProductServices.instance;
    }

    ProductServices.instance = this;

    return this;
  }

  apiProduct = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/products`;

  getProducts = async (countryId) => {
    try {
      const response = await axios.get(`${this.apiProduct}/?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  getProductsById = async (countryId, productId) => {
    try {
      const response = await axios.get(`${this.apiProduct}/${productId}/?country=${countryId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  };

  addProduct = async (countryId, data) => {
    try {
      const response = await axios.post(`${this.apiProduct}/?country=${countryId}`, { body: data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  editProduct = async (countryId, productId, data) => {
    try {
      const response = await axios.put(`${this.apiProduct}/${productId}?country=${countryId}`, { body: data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

  deleteProduct = async (countryId, productId, idUserEdit) => {
    try {
      const data = { body: { isDeleted: true, idUserEdit } };
      const response = await axios({ method: 'DELETE', url: `${this.apiProduct}/${productId}?country=${countryId}`, data });
      return response;
    } catch (error) {
      return error.response;
    }
  };

}

export default ProductServices;