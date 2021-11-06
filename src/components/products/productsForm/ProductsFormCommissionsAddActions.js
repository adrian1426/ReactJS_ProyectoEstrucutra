import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    borderRadius: '15px !important',
    marginLeft: '13px',
    minWidth: '170px'
  }
};


const ProductsFormCommissionsAddActions = props => {
  const { onClose, onAddCommission } = props;
  const { t } = useTranslation('productsForm');

  return (
    <React.Fragment>
      <Button
        style={styles.button}
        color="primary"
        variant="outlined"
        onClick={onClose}
      >
        {t('formComm.actionCancel')}
      </Button>

      <Button
        style={styles.button}
        color="primary"
        variant="contained"
        onClick={onAddCommission}
      >
        {t('formComm.actionAdd')}
      </Button>
    </React.Fragment>
  );
};

ProductsFormCommissionsAddActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddCommission: PropTypes.func.isRequired
};

export default ProductsFormCommissionsAddActions;