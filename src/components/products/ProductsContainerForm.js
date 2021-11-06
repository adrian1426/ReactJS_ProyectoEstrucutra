import React, { useEffect, useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Container from '../common/Container/Container';
import ProductsForm from './productsForm/ProductsForm';
import ProductServices from './../../services/ProductServices';
import CompanyServices from './../../services/CompanyServices';
import { refsCompany, refsPeriodicity } from '../../constants/refsCollection';
import { initialStateProduct } from './productsForm/initialState';
import HomeContext from '../../context/HomeContext';
import UserContext from '../../context/UserContext';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { productsListBase } from '../../constants/appRoutes';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import { useTranslation } from 'react-i18next';

const productTrasnform = (product, commissions) => {
  const newProduct = {
    ...product,
    companyRef: `${refsCompany}/${product.companyRef?.id}`,
    periodicityRef: `${refsPeriodicity}/${product.periodicityRef?.id}`,
    interestCapitalization: product.interestCapitalization?.value,
    commissions
  };

  return newProduct;
};

const ProductsContainerForm = props => {
  const { match, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [products, setProducts] = useState(initialStateProduct);
  const dispatch = useContext(HomeContext)[1];
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('productsForm');
  const codeCountry = match.params.country;
  const productId = match.params.productId;
  const titleApp = productId ? t('header.appTitleEdit') : t('header.appTitleAdd');

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const redirectProductList = () => {
    history.push(`/${productsListBase}/${codeCountry}`);
  };

  const getCompanies = useCallback(async () => {
    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      const companiesActive = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
      setCompanies(companiesActive);
    } else {
      setCompanies([]);
    }
  }, [codeCountry]);

  const getProductsById = useCallback(async () => {
    const productServices = new ProductServices();
    const response = await productServices.getProductsById(codeCountry, productId);

    if (response?.status === 200) {
      setProducts(response.data);
      setIsLoading(false);
    } else {
      showMessage('error', t('messages.errorGet'));
      setIsLoading(false);
    }
  }, [codeCountry, productId, showMessage, t]);

  const addProduct = async (product, commissions) => {
    const newProduct = productTrasnform(product, commissions);

    const productServices = new ProductServices();
    const response = await productServices.addProduct(codeCountry, newProduct);

    if (response?.status === 200) {
      showMessage('success', t('messages.addProduct'));
      redirectProductList();
    } else {
      const message = t('messages.error', { detail: response?.data?.detail });
      showMessage('error', message);
    }
  };

  const editProduct = async (product, commissions) => {
    const newProduct = { ...productTrasnform(product, commissions), idUserEdit: userState.id };

    const productServices = new ProductServices();
    const response = await productServices.editProduct(codeCountry, productId, newProduct);

    if (response?.status === 200) {
      showMessage('success', t('messages.updateProduct'));
      redirectProductList();
    } else {
      const message = t('messages.error', { detail: response?.data?.detail });
      showMessage('error', message);
    }
  };

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductsById();
    }
  }, [productId, getProductsById]);

  return (
    <React.Fragment>
      <Container
        applicationName={t('header.appName')}
        titleApplications={titleApp}
      >
        <ProductsForm
          companies={companies}
          initialState={products}
          addProduct={productId ? editProduct : addProduct}
          redirectProductList={redirectProductList}
        />
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

ProductsContainerForm.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default ProductsContainerForm;