import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../common/table/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import DropDownSelect from './../../common/dropdown/DropDownSelect';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import { collectMoments, fixedVariable, drivers, confirmations } from '../../../constants/catalogs';

const ProductsFormCommissionsTable = props => {
  const { commissions, onEditCommissionDropdown, onEditCommissionText, onDeleteCommissions } = props;
  const { t } = useTranslation('productsForm');

  const columns = [
    { fieldId: 'id', label: t('formComm.id') },
    { fieldId: 'name', label: t('formComm.nameT') },
    {
      fieldId: 'collectMoment', label: t('formComm.collectMom'), render: rowData => {
        const selectedIndex = collectMoments.findIndex(cm => cm.id === rowData.collectMoment.id);
        return (
          <DropDownSelect
            options={collectMoments}
            value='id'
            label='moment'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'collectMoment' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'fixedVariable', label: t('formComm.fixVar'), render: rowData => {
        const selectedIndex = fixedVariable.findIndex(fv => fv.id === rowData.fixedVariable.id);
        return (
          <DropDownSelect
            options={fixedVariable}
            value='id'
            label='type'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'fixedVariable' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'driver', label: t('formComm.driver'), render: rowData => {
        const selectedIndex = drivers.findIndex(d => d.id === rowData.driver.id);
        return (
          <DropDownSelect
            options={drivers}
            value='id'
            label='driver'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'driver' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'minType', label: t('formComm.minType'), render: rowData => {
        const selectedIndex = fixedVariable.findIndex(fv => fv.id === rowData.minType.id);
        return (
          <DropDownSelect
            options={fixedVariable}
            value='id'
            label='type'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'minType' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'minDriver', label: t('formComm.minDriver'), render: rowData => {
        const selectedIndex = drivers.findIndex(d => d.id === rowData.minDriver.id);
        return (
          <DropDownSelect
            options={drivers}
            value='id'
            label='driver'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'minDriver' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'maxType', label: t('formComm.maxType'), render: rowData => {
        const selectedIndex = fixedVariable.findIndex(fv => fv.id === rowData.maxType.id);
        return (
          <DropDownSelect
            options={fixedVariable}
            value='id'
            label='type'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'maxType' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'maxDriver', label: t('formComm.maxDriver'), render: rowData => {
        const selectedIndex = drivers.findIndex(d => d.id === rowData.maxDriver.id);
        return (
          <DropDownSelect
            options={drivers}
            value='id'
            label='driver'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'maxDriver' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'driverTerm', label: t('formComm.driverTerm'), render: rowData => {
        const selectedIndex = confirmations.findIndex(con => con.value === rowData.driverTerm);
        return (
          <DropDownSelect
            options={confirmations}
            value='id'
            label='label'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'driverTerm', noObj: true, valData: 'value' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'commissionCost', label: t('formComm.cost'), render: rowData => {
        return (
          <TextField
            variant='outlined'
            defaultValue={rowData.commissionCost}
            name='commissionCost'
            onChange={(e) => onEditCommissionText(e, rowData.id)}
          />
        );
      }
    },
    {
      fieldId: 'vat', label: t('formComm.vat'), render: rowData => {
        const selectedIndex = confirmations.findIndex(con => con.value === rowData.vat);
        return (
          <DropDownSelect
            options={confirmations}
            value='id'
            label='label'
            indexSelect={selectedIndex}
            dataTable={{ id: rowData.id, nameObj: 'vat', noObj: true, valData: 'value' }}
            onClickItem={onEditCommissionDropdown}
          />
        );
      }
    },
    {
      fieldId: 'percentageSaved', label: t('formComm.perSaved'), render: rowData => {
        return (
          <TextField
            variant='outlined'
            defaultValue={rowData.percentageSaved}
            name='percentageSaved'
            onChange={(e) => onEditCommissionText(e, rowData.id)}
          />
        );
      }
    },
    {
      fieldId: 'paymentOrder', label: t('formComm.payOrder'), render: rowData => {
        return (
          <TextField
            variant='outlined'
            defaultValue={rowData.paymentOrder}
            name='paymentOrder'
            onChange={(e) => onEditCommissionText(e, rowData.id)}
          />
        );
      }
    }
  ];

  return (
    <Table
      columns={columns}
      data={commissions}
      dense={true}
      backgroundActions={true}
      options={{
        pagination: false
      }}
      actions={() => (
        [
          {
            Icon: DeleteIcon,
            tooltip: t('formComm.tableActDel'),
            onClick: onDeleteCommissions
          }
        ]
      )}
    />
  );
};

ProductsFormCommissionsTable.propTypes = {
  commissions: PropTypes.array.isRequired,
  onEditCommissionDropdown: PropTypes.func.isRequired,
  onEditCommissionText: PropTypes.func.isRequired,
  onDeleteCommissions: PropTypes.func.isRequired
};

export default ProductsFormCommissionsTable;