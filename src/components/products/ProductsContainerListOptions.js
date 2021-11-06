import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddShoppingIcon from '@material-ui/icons/AddShoppingCart';
import UserContext from '../../context/UserContext';
import { productsFormBase } from '../../constants/appRoutes';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    minWidth: '230px'
  }
};


const ProductsContainerListOptions = props => {
  const { history, codeCountry } = props;
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('productsList');

  return !userState.isReadOnly ? (
    <Button
      data-testid='addProduct'
      style={styles.button}
      color="secondary"
      variant="contained"
      startIcon={<AddShoppingIcon />}
      onClick={
        () => history.push(`/${productsFormBase}/${codeCountry}`)
      }
    >
      {t('header.options.addProduct')}
    </Button>
  ) : null;
};

ProductsContainerListOptions.propTypes = {
  history: PropTypes.object.isRequired,
  codeCountry: PropTypes.string.isRequired
};

export default ProductsContainerListOptions;