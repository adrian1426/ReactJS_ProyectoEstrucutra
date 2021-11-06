import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SubContainer from '../../common/Container/SubContainer';
import Table from '../../common/table/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../../../context/UserContext';
import { productsFormBase } from '../../../constants/appRoutes';
import { useTranslation } from 'react-i18next';

const ProductsList = props => {
  const { productsDataTable, onDeleteProduct, history, codeCountry, isLoading } = props;
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('productsList');

  const columns = [
    { fieldId: 'name', label: t('table.column1') },
    { fieldId: 'businessName', label: t('table.column2') },
    { fieldId: 'annualRate', label: t('table.column3') },
    { fieldId: 'contractedTerm', label: t('table.column4') },
    { fieldId: 'supplementaryTermFactor', label: t('table.column5') },
    { fieldId: 'periodicity', label: t('table.column6') },
    { fieldId: 'periodRate', label: t('table.column7') },
    { fieldId: 'ivaRate', label: t('table.column8') },
    { fieldId: 'interestCapitalization', label: t('table.column9') },
    { fieldId: 'moratoriumPeriod', label: t('table.column10') },
    { fieldId: 'annualMoratoriumInterest', label: t('table.column11') }
  ];

  const onEditProduct = product => {
    history.push(`/${productsFormBase}/${codeCountry}/${product.id}`);
  };

  const actions = () => (
    [
      {
        Icon: EditIcon,
        tooltip: t('table.actions.edit'),
        onClick: onEditProduct
      },
      {
        Icon: DeleteIcon,
        tooltip: t('table.actions.delete'),
        onClick: onDeleteProduct
      }
    ]
  );

  const actionsTable = !userState.isReadOnly ? actions : null;

  return (
    <SubContainer>
      <Table
        columns={columns}
        data={productsDataTable}
        dense={true}
        actions={actionsTable}
        isLoading={isLoading}
      />
    </SubContainer>
  );
};

ProductsList.propTypes = {
  productsDataTable: PropTypes.array,
  onDeleteProduct: PropTypes.func,
  history: PropTypes.object.isRequired,
  codeCountry: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
};

ProductsList.defaultProps = {
  productsDataTable: [],
  onDeleteProduct: () => { },
  isLoading: false
};

export default ProductsList;