import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Container from '../common/Container/Container';
import ProductsContainerListOptions from './ProductsContainerListOptions';
import ProductsList from './productsList/ProductsList';
import ProductServices from './../../services/ProductServices';
import HomeContext from '../../context/HomeContext';
import UserContext from '../../context/UserContext';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import { useTranslation } from 'react-i18next';

const ProductsContainerList = props => {
  const { match, history } = props;
  const codeCountry = match.params.country;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [products, setProducts] = useState([]);
  const dispatch = useContext(HomeContext)[1];
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('productsList');

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const confirmDeleteProduct = product => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: t('modalConfirm.textPrimary'),
        textSecundary: t('modalConfirm.textSecundary', { name: product.name }),
        actionConfirm: () => deleteProduct(product.id)
      }
    ));
  };

  const cancelIsLaoding = () => {
    setIsLoading(false);
    setIsLoadingTable(false);
  };

  const getProducts = useCallback(async () => {
    setIsLoadingTable(true);
    const productServices = new ProductServices();
    const response = await productServices.getProducts(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      setProducts(response.data);
      cancelIsLaoding();
    } else {
      setProducts([]);
      cancelIsLaoding();
      showMessage('info', t('messages.errorGet'));
    }
  }, [codeCountry, showMessage, t]);

  const deleteProduct = async productId => {
    const productServices = new ProductServices();
    const response = await productServices.deleteProduct(codeCountry, productId, userState.id);

    if (response?.status === 200) {
      getProducts();
      dispatch(hideConfirmationAction());
      showMessage('success', t('messages.successDelete', { name: response.data.name }));
    } else {
      const message = t('messages.errorDelete', { detail: response?.data?.detail });
      showMessage('error', message);
    }
  };

  const productsDataTable = useMemo(() => (
    products.map(item => {
      return {
        id: item.id,
        name: item.name,
        businessName: item.companyRef?.businessName,
        annualRate: `${item.annualRate} %`,
        contractedTerm: item.contractedTerm,
        supplementaryTermFactor: item.supplementaryTermFactor,
        periodicity: item.periodicityRef?.name,
        ivaRate: `${item.ivaRate} %`,
        interestCapitalization: item.interestCapitalization ? t('confirmations.yes') : t('confirmations.no'),
        moratoriumPeriod: item.moratoriumPeriod?.title,
        annualMoratoriumInterest: `${item.annualMoratoriumInterest} %`,
        periodRate: `${item.periodRate} %`
      };
    })
  ), [products, t]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <React.Fragment>
      <Container
        applicationName={t('header.appName')}
        titleApplications={t('header.appTitle')}
        componentHeader={
          <ProductsContainerListOptions
            {...{ history, codeCountry }}
          />
        }
      >
        <ProductsList
          productsDataTable={productsDataTable}
          onDeleteProduct={confirmDeleteProduct}
          history={history}
          codeCountry={codeCountry}
          isLoading={isLoadingTable}
        />
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

ProductsContainerList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default ProductsContainerList;