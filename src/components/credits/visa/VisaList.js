import React from 'react';
import Table from '../../common/table/Table';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
const VisaList = props => {
  //declaraciones
  const { statusCredits, columns, dataTable, loadingTable, approveCredit, declineCredit } = props;
  console.log(dataTable);

  const actions = (datarow) => (
    [
      {
        Icon: CheckIcon,
        tooltip: 'Aprobar crédito',
        onClick: handlerApproveCredit,
        disabled: statusCredits === 'APPROVED' || statusCredits === 'DISMISSED' ? true : false
      },
      {
        Icon: ClearIcon,
        tooltip: 'Rechazar crédito',
        onClick: handlerDeclineCredit,
        disabled: statusCredits === 'APPROVED' || statusCredits === 'DISMISSED' ? true : false
      }
    ]
  );

  //funciones
  const handlerApproveCredit = (event) => {
    approveCredit(event);
  }
  const handlerDeclineCredit = (event) => {
    declineCredit(event);
  }
  //template
  return (
    <Table
      actions={actions}
      columns={columns}
      data={dataTable}
      isLoading={loadingTable}
      backgroundActions={true}
    />
  );
};

export default VisaList;