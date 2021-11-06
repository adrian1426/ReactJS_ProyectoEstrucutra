import React, { useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Table from '../../common/table/Table';
import UserContext from '../../../context/UserContext';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EmployeesListActionsEdit from './EmployeesListActionsEdit';
import { useTranslation } from 'react-i18next';
import { employeesDetailBase } from '../../../constants/appRoutes';

const EmployeesList = props => {
  const {
    addSelectEmployees, history, codeCountry, editEmployees, confirmDeleteEmployees, pageSizeFirst,
    dataEmployees, getEmployeesFilter, getEmployees, isLoadingTable
  } = props;
  const [selectedEmployeeEdit, setSelectedEmployeeEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('employeesList');

  const columns = [
    { fieldId: 'id', label: t('table.colId') },
    { fieldId: 'name', label: t('table.colName') },
    { fieldId: 'code', label: t('table.colCode') },
    { fieldId: 'noEmployee', label: t('table.colNoEmployee') },
    { fieldId: 'email', label: t('table.colEmail') },
    { fieldId: 'status', label: t('table.colStatus') },
    { fieldId: 'maxAmount', label: t('table.colMaxAmount') },
    { fieldId: 'rfc', label: t('table.colRFC') },
    { fieldId: 'payrollAmount', label: t('table.colPayrollAmount') },
    { fieldId: 'periodicity', label: t('table.colPeriodicity') },
    { fieldId: 'clabe', label: t('table.colClabe') },
    { fieldId: 'enableCredit', label: t('table.colEnableCredit') },
    { fieldId: 'creditAmount', label: t('table.colCreditAmount') },
    { fieldId: 'instituteCode', label: t('table.colInstituteCode') },
    { fieldId: 'isActive', label: t('table.colIsActive') },
    { fieldId: 'createdAt', label: t('table.colCreatedAt') }
  ];


  const data = useMemo(() => {
    if (dataEmployees?.length > 0) {
      return dataEmployees.map(item => {
        return {
          id: item.id,
          name: item.name,
          code: item?.companyRef?.code,
          noEmployee: item?.idEmployee,
          email: item?.emailWork,
          status: item?.employeeStatusRef?.name,
          statusValue: item?.employeeStatusRef?.value,
          maxAmount: item?.maxAmount,
          rfc: item?.rfc,
          payrollAmount: item?.payrollAmount,
          periodicity: item?.periodicityRef?.name,
          clabe: item?.clabe,
          enableCredit: item?.enableCredit ? 'Sí' : 'No',
          creditAmount: item?.creditAmount,
          instituteCode: item?.instituteCode,
          isActive: item.isActive ? 'Sí' : 'No',
          createdAt: new Date(item.createdAt).toLocaleDateString()
        };
      });
    }

    return [];
  }, [dataEmployees]);

  const redirectDetailsEmployees = (employee) => {
    history.push(`/${employeesDetailBase}/${codeCountry}/${employee.id}`);
  };

  const addSelectedEmployee = employee => {
    setSelectedEmployeeEdit(employee);
    setOpenEdit(true);
  };

  const closeEditEmployee = () => {
    setSelectedEmployeeEdit(null);
    setOpenEdit(false);
  };

  const actions = (dataRow) => (
    [
      {
        Icon: PersonIcon,
        tooltip: t('table.actionDetail'),
        onClick: redirectDetailsEmployees
      },
      {
        Icon: AssignmentReturnedIcon,
        tooltip: t('table.actionContract'),
        onClick: () => console.log('descargar contrato'),
        disabled: dataRow.statusValue !== '4'
      },
      {
        Icon: NotificationsIcon,
        tooltip: t('table.actionNotify'),
        onClick: () => console.log('Notificar')
      },
      {
        Icon: EditIcon,
        tooltip: t('table.actionEdit'),
        onClick: addSelectedEmployee
      },
      {
        Icon: DeleteIcon,
        tooltip: t('table.actionDelete'),
        onClick: confirmDeleteEmployees
      }
    ]
  );

  const actionsTable = !userState.isReadOnly ? actions : null;

  return (
    <React.Fragment>
      <Table
        columns={columns}
        data={data}
        actions={actionsTable}
        backgroundActions={true}
        dense={true}
        options={{
          check: true,
          paginationRows: [pageSizeFirst, 500, 700],
          paginationRemote: true
        }}
        actionsMinWidth='170px'
        callbackSelected={addSelectEmployees}
        callbackNewPage={getEmployeesFilter}
        callBacknewRowPerPage={getEmployees}
        isLoading={isLoadingTable}
      />

      <EmployeesListActionsEdit
        openEdit={openEdit}
        selectedEmployeeEdit={selectedEmployeeEdit}
        closeEditEmployee={closeEditEmployee}
        editEmployees={editEmployees}
      />
    </React.Fragment>
  );
};

EmployeesList.propTypes = {
  addSelectEmployees: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  codeCountry: PropTypes.string.isRequired,
  editEmployees: PropTypes.func.isRequired,
  confirmDeleteEmployees: PropTypes.func.isRequired,
  pageSizeFirst: PropTypes.number.isRequired,
  dataEmployees: PropTypes.array.isRequired,
  getEmployeesFilter: PropTypes.func.isRequired,
  getEmployees: PropTypes.func.isRequired,
  isLoadingTable: PropTypes.bool.isRequired
};

export default EmployeesList;