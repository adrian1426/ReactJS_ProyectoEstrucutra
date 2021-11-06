import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ProductsFormCommissionsAdd from './ProductsFormCommissionsAdd';
import ProductsFormCommissionsTable from './ProductsFormCommissionsTable';
import { useTranslation } from 'react-i18next';
import Styles from './ProductsFormCommissions.module.css';

const ProductsFormCommissions = props => {
  const { commissions, handleAddCommission, onEditCommissionDropdown, onEditCommissionText, onDeleteCommissions } = props;
  const { t } = useTranslation('productsForm');
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <React.Fragment>
      <Typography>{t('titleCommissions')}</Typography>

      <Button
        className={Styles.btnCommissions}
        variant='contained'
        color='secondary'
        endIcon={<AddIcon />}
        onClick={handleOpenForm}
      >
        {t('btnCommissions')}
      </Button>

      {
        commissions.length > 0 && (
          <div className={Styles.tableCommissions}>
            <ProductsFormCommissionsTable
              commissions={commissions}
              onEditCommissionDropdown={onEditCommissionDropdown}
              onEditCommissionText={onEditCommissionText}
              onDeleteCommissions={onDeleteCommissions}
            />
          </div>
        )
      }

      <ProductsFormCommissionsAdd
        openForm={openForm}
        handleCloseForm={handleCloseForm}
        title={t('formComm.title')}
        handleAddCommission={handleAddCommission}
      />
    </React.Fragment>
  );
};

ProductsFormCommissions.propTypes = {
  commissions: PropTypes.array.isRequired,
  handleAddCommission: PropTypes.func.isRequired,
  onEditCommissionDropdown: PropTypes.func.isRequired,
  onEditCommissionText: PropTypes.func.isRequired,
  onDeleteCommissions: PropTypes.func.isRequired
};

export default ProductsFormCommissions;