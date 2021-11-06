import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from '../common/Container/Container';
import SubContainer from './../common/Container/SubContainer';
import EmployeesContainerListOptions from './EmployeesContainerListOptions';
import EmployeesListFilter from './employeesList/EmployeesListFilter';
import EmployeesList from './employeesList/EmployeesList';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import UserContext from '../../context/UserContext';
import HomeContext from '../../context/HomeContext';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import { useTranslation } from 'react-i18next';
import CompanyServices from './../../services/CompanyServices';
import EmployeeServices from './../../services/EmployeeServices';
import CatalogServices from './../../services/CatalogServices';

const pageSizeFirst = 3;

const EmployeesContainerList = props => {
  const { match, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [nameEmployees, setNameEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [userStatus, setUserStatus] = useState([]);
  const [employeesSelected, setEmployeesSelected] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pageSizeTable, setPageSizeTable] = useState(pageSizeFirst);
  const [filtersTable, setFiltersTable] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const { state: userState } = useContext(UserContext);
  const dispatch = useContext(HomeContext)[1];
  const { t } = useTranslation('employeesList');
  const codeCountry = match.params.country;
  const isSelectedData = employeesSelected.length > 0;
  const employeesListFilterRef = useRef(null);

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const confirmUploadEmployees = data => {
    dispatch(showConfirmationAction({
      open: true,
      textPrimary: t('uploadEmployee.textPrimary'),
      textSecundary: `${t('uploadEmployee.textSecundary')}
      <br/>
      <br/>
      <b>${t('uploadEmployee.total')} </b>${data.total}
      <br/>
      <b>${t('uploadEmployee.new')} </b>${data.new}
      <br/>
      <b>${t('uploadEmployee.updated')} </b>${data.updated}
      <br/>
      <b>${t('uploadEmployee.error')} </b>${data.failed}
      `,
      infoOnly: true,
      actionConfirm: () => dispatch(hideConfirmationAction())
    }));
  };

  const confirmSendEmail = data => {
    dispatch(showConfirmationAction({
      open: true,
      textPrimary: 'Envio de correos a empleados',
      textSecundary: `Resultado de envio de correos a empleados
      <br/>
      <br/>
      <b>Total enviados: </b>${data.total}
      <br/>
      <b>Enviado exitosamente: </b>${data.successful}
      <br/>
      <b>Envios fallidos: </b>${data.failed}`,
      infoOnly: true,
      actionConfirm: () => dispatch(hideConfirmationAction())
    }));
  };

  const confirmDeleteEmployees = data => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: t('confirmDelete.textPrimary'),
        textSecundary: t('confirmDelete.textSecundary', { name: data.name }),
        actionConfirm: () => deleteEmployees(data)
      }
    ));
  };

  const addSelectEmployees = (selectedData) => {
    setEmployeesSelected(selectedData);
  };

  const addFilterTable = (filterInfo) => {
    setFiltersTable(filterInfo);
  };

  const cleanFilter = () => {
    employeesListFilterRef.current.cleanFilter();
  };

  const getEmployeesName = async (name) => {
    if (name !== null && name.trim()) {
      const employeeServices = new EmployeeServices();
      const response = await employeeServices.getEmployeesName(codeCountry, name);

      if (response?.status === 200 && response.data.length > 0) {
        setNameEmployees(response.data);
      } else {
        setNameEmployees([]);
      };
    }
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

  const getUserStatus = useCallback(async () => {
    const catalogServices = new CatalogServices();
    const response = await catalogServices.getUserStatus(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      const newUserStatus = response.data.sort((a, b) => a.order - b.order);
      setUserStatus(newUserStatus);
    } else {
      setUserStatus([]);
    }
  }, [codeCountry]);

  const getEmployees = useCallback(async (pageSize = pageSizeFirst) => {
    cleanFilter();
    setFiltersTable(null);
    setIsLoading(true);
    setIsLoadingTable(true);
    setPageSizeTable(pageSize);

    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getEmployeesFilter(codeCountry, pageSize, {});

    if (response?.status === 200 && response.data.length > 0) {
      setEmployees(response.data);
      setIsLoading(false);
      setIsLoadingTable(false);
    } else {
      setEmployees([]);
      setIsLoading(false);
      setIsLoadingTable(false);
      showMessage('info', t('messages.infoGetEmployee'));
    }
  }, [codeCountry, showMessage, t]);

  const getEmployeesFilter = useCallback(async (pageSize, actionPage) => {
    setIsLoadingTable(true);
    setPageSizeTable(pageSize);

    const valPrev = (employees.length - pageSize) >= 0 ? employees.length - pageSize : 0;
    const valNext = employees.length - 1;
    const prevId = actionPage === 'PREV' && { prevDocument: employees[valPrev]?.id };
    const nextId = actionPage === 'NEXT' && { nextDocument: employees[valNext]?.id };
    const filters = filtersTable !== null && filtersTable;

    const body = {
      ...prevId,
      ...nextId,
      ...filters
    };

    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getEmployeesFilter(codeCountry, pageSize, body);

    if (response?.status === 200 && response.data.length > 0) {
      setEmployees(response.data);
      setIsLoadingTable(false);
    } else {
      if (filtersTable) {
        showMessage('warning', t('messages.infoEmployeeFil'));
        getEmployees(pageSize);
      } else {
        getEmployees(pageSize);
      }
    }

  }, [codeCountry, employees, filtersTable, getEmployees, showMessage, t]);

  const uploadEmployees = async e => {
    setIsLoading(true);
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.uploadEmployees(codeCountry, userState.id, e.target.files[0]);

    if (response?.status === 200) {
      setIsLoading(false);
      confirmUploadEmployees(response.data);
    } else {
      setIsLoading(false);
      showMessage('error', t('messages.errorUpload', { detail: response?.data?.detail }));
    }
  };

  const editEmployees = async data => {
    setIsLoading(true);
    const newEmployee = {
      isActive: data.enableCredit,
      priceAmount: (data?.creditAmount === null || data?.creditAmount === '') ? 0 : data.creditAmount,
      idUserEdit: userState.id
    };

    const employeeServices = new EmployeeServices();
    const response = await employeeServices.editEmployee(codeCountry, data.id, newEmployee);

    if (response?.status === 200) {
      setIsLoading(false);
      showMessage('success', t('messages.successEdit'));
    } else {
      setIsLoading(false);
      showMessage('error', t('messages.errorEdit'));
    }
  };

  const deleteEmployees = async data => {
    dispatch(hideConfirmationAction());
    setIsLoading(true);
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.deleteEmployee(codeCountry, data.id, userState.id);

    if (response?.status === 200) {
      setIsLoading(false);
      showMessage('success', t('messages.sucessDelete'));
      getEmployeesFilter(pageSizeTable, null);
    } else {

      setIsLoading(false);
      showMessage('error', t('messages.errorDelete'));
    }
  };

  const sendEmails = async () => {
    setIsLoading(true);
    const isSelectEmployeesAll = pageSizeTable === employeesSelected.length;
    const newReceivers = employeesSelected.map(item => item.id);
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.sendEmailInvitation(codeCountry, newReceivers);

    console.log('isFiltered: ', isFiltered);
    console.log('selectedAll: ', isSelectEmployeesAll);

    if (response?.status === 200) {
      confirmSendEmail(response.data);
      setIsLoading(false);
    } else {
      showMessage('error', `¡No se pudo enviar el email ${response?.data?.detail}!`);
      setIsLoading(false);
    };
  };

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  useEffect(() => {
    getUserStatus();
  }, [getUserStatus]);

  useEffect(() => {
    if (filtersTable && !isFiltered) {
      setIsFiltered(true);
      getEmployeesFilter(pageSizeTable, null);
    }
  }, [filtersTable, getEmployeesFilter, pageSizeTable, isFiltered]);


  return (
    <React.Fragment>
      <Container
        applicationName={t('header.appName')}
        titleApplications={t('header.appTitle')}
        componentHeader={
          <EmployeesContainerListOptions
            uploadEmployees={uploadEmployees}
            sendEmails={sendEmails}
            isSelectedData={isSelectedData}
          />
        }
      >
        <SubContainer>
          <EmployeesListFilter
            companies={companies}
            nameEmployees={nameEmployees}
            userStatus={userStatus}
            getEmployeesName={getEmployeesName}
            pageSizeTable={pageSizeTable}
            getEmployees={getEmployees}
            addFilterTable={addFilterTable}
            setIsFiltered={setIsFiltered}
            ref={employeesListFilterRef}
          />

          <EmployeesList
            addSelectEmployees={addSelectEmployees}
            history={history}
            codeCountry={codeCountry}
            editEmployees={editEmployees}
            confirmDeleteEmployees={confirmDeleteEmployees}
            pageSizeFirst={pageSizeFirst}
            dataEmployees={employees}
            getEmployeesFilter={getEmployeesFilter}
            getEmployees={getEmployees}
            isLoadingTable={isLoadingTable}
          />
        </SubContainer>
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

EmployeesContainerList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default EmployeesContainerList;