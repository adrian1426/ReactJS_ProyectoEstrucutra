import React, { useCallback, useEffect, useState, useContext } from 'react';

import Container from '../common/Container/Container';
import SubContainer from '../common/Container/SubContainer';
import VisaFilters from './visa/VisaFilters';
import VisaList from './visa/VisaList';
import VisaNavTabs from './visa/VisaNavTabs';
import { TAB_PENDING, TAB_APPROVED, TAB_DISMISSED } from '../../constants/catalogs';
import CompanyServices from '../../services/CompanyServices';
import CreditServices from '../../services/CreditServices';
import HomeContext from '../../context/HomeContext';
import DialogContainer from './../common/dialog/dialogContainer/DialogContainer';
import DialogContent from './../common/dialog/dialogContainer/DialogContent';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { Button, Grid, TextField } from '@material-ui/core';

const VisaContainer = props => {
  //declaraciones
  const { match } = props;
  const [companies, setCompanies] = useState([]);
  const codeCountry = match.params.country;
  const statusCredits = match.params.statusId || TAB_PENDING;
  const selectDefaultStatus = match.params.statusId ? false : true;
  const [dataTable, setDataTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const dispatch = useContext(HomeContext)[1];
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [openFormDeclineCredit, setopenFormDeclineCredit] = useState(false);
  const [dataCredit, setDataCredit] = useState(null);//datos del credito que se se va a rechazar o aprobar
  const [rejectionReason, setRejectionReason] = useState('');
  const [statusCredit, setStatusCredit] = useState(1);
  const columnsTable = [
    { fieldId: 'invoice', label: 'Folio' },
    { fieldId: 'balance', label: 'Saldo' },
    { fieldId: 'requestPeriod', label: 'Periodo solicitud' },
    { fieldId: 'status', label: 'Estatus' },
    { fieldId: 'requestMount', label: 'Monto solicitado' },
    { fieldId: 'totalMount', label: 'Monto total' },
    { fieldId: 'company', label: 'Empresa' },
    { fieldId: 'employee', label: 'Cliente' },
    { fieldId: 'netAmountToDisburse', label: 'Monto neto a desembolsar' },
    { fieldId: 'gracePeriod', label: 'Periodo de gracia' },
    { fieldId: 'shareWeekliEstimated', label: 'Cuota semanal estimada' },
    { fieldId: 'creditMount', label: 'Monto credito' },
    { fieldId: 'origination', label: 'Originacion' },
    { fieldId: 'lifeInsurance', label: 'Seguro de vida' },
  ];

  //funciones
  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const getStatusCredits = useCallback(() => {
    switch (statusCredits) {
      case TAB_PENDING:
        setStatusCredit(1);
        break;
      case TAB_APPROVED:
        setStatusCredit(2);
        break;
      case TAB_DISMISSED:
        setStatusCredit(3);
        break;
      default:
        setStatusCredit(1);
    }

  }, [codeCountry, statusCredits]);

  const getCompanies = useCallback(async () => {
    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);
    if (response?.status === 200 && response.data.length > 0) {
      const activeCompanies = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
      setCompanies(activeCompanies);
      setLoadingCompanies(false);
    } else {
      setCompanies([]);
      setLoadingCompanies(false)
    }
  }, [codeCountry]);

  const filterData = (event) => {
    //se invoca a la funcion getDataCredits y se le pasa como paramentros el event 
  }

  const clearFilter = (event) => {
    //se invoca le funcion getDataCredits
    setLoadingTable(true);
    getDataCredits();
  }

  const getDataCredits = useCallback(async () => {
    //funcion para implementar el servicio de visacion
    setLoadingTable(true);
    const creditServives = new CreditServices();
    const response = await creditServives.getVisaCredits('co', {},statusCredit);
    if (response?.status === 200 && response.data.length > 0) {
      buildDataTable(response.data);
      
      setLoadingTable(false);
    } else {
      setDataTable([]);
      setLoadingTable(false);
    }
  }, [codeCountry,statusCredit]);

  const buildDataTable = data => {
    const d = data.map(item =>{
      return {
        invoice: item.id,
        balance: item.balance ? item.balance : 0,
        requestPeriod: item.requestPeriod ? item.requestPeriod : 0,
        status: item.statusRef ? item.statusRef.name : '',
        requestMount: item.requestedAmount ? item.requestedAmount : 0,
        totalMount: item.totalMount ? item.totalMount: 0,
        company: item.companyRef ? item.companyRef.businessName: '',
        employee: item.employeeRef ? item.employeeRef.name : '',
        netAmountToDisburse: item.requestedAmount ? item.requestedAmount : 0,
        gracePeriod: item.creditProductRef ? item.creditProductRef : '',
        shareWeekliEstimated: item.shareWeekliEstimated ? item.shareWeekliEstimated : 0,
        creditMount: item.approvedAmount ? item.approvedAmount : 0,
        origination: item.origination ? item.origination : 0,
        lifeInsurance: item.comission ? item.comission : 0
      };
    });
    setDataTable(d);
  }

  //acciones de la tabla
  //modal de confirmacion de aprobacion de credito
  const approveCredit = (event) => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Aprobar crédito',
        textSecundary: `¿Desea aprobar el crédito con folio ${event.invoice}?`,
        actionConfirm: () => confirmApproveCredit(event)
      }
    ));

  }
  //modal con formulario para cancelacion de credito
  const declineCredit = (event) => {
    setDataCredit(event);
    setopenFormDeclineCredit(true);
  }
  //guarda la aprobacion del credito
  const confirmApproveCredit = (event) => {
    //se debe modificar para que sea asincrono y llamar al servicio correspondiente
    dispatch(hideConfirmationAction());
  }
  //captura evento de textarea de modal motivo de rechazo
  const onChangeReason = (event) => {
    setRejectionReason(event.target.value);
  }
  //Guarda el rechazo del credito
  const confirmDeclineCredit = () => {
    //se debe modificar para que sea asincrono y llamar al servicio correspondiente
    setopenFormDeclineCredit(false);
    setRejectionReason('');
  }
  const closeFormDeclineCredit = () => {
    setopenFormDeclineCredit(false);
  }


  //datos dummies
  const datadummy = [
    {
      invoice: 'kjagsdxlhas4567',
      balance: 45867846,
      requestPeriod: '7',
      status: 'solicitado',
      requestMount: 500000,
      totalMount: 700000,
      company: 'Uber Eats CO',
      employee: 'Erik Vidal Jimenez',
      netAmountToDisburse: 500000,
      gracePeriod: 1,
      shareWeekliEstimated: 20000,
      creditMount: 700000,
      origination: 0,
      lifeInsurance: 50000
    }
  ]
  useEffect(() => {
    getStatusCredits();
    getCompanies();
    getDataCredits();

  }, [getStatusCredits, getCompanies, getDataCredits]);

  return (
    <Container
      applicationName='Créditos'
      titleApplications='Visación'
    >
      <React.Fragment>
        <VisaNavTabs
          country={codeCountry}
          selectedDefault={selectDefaultStatus}
        />
        <SubContainer>
          <VisaFilters
            statusCredits={statusCredits}
            companies={companies}
            filterData={filterData}
            clearFilter={clearFilter}
          />
          <VisaList
            statusCredits={statusCredits}
            columns={columnsTable}
            dataTable={dataTable}
            loadingTable={loadingTable}
            declineCredit={declineCredit}
            approveCredit={approveCredit}
          />
        </SubContainer>
        <DialogContainer
          open={openFormDeclineCredit}
          handleClose={closeFormDeclineCredit}
          title={'Rechazar crédito'}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Motivo de rechazo'
                  multiline
                  rows={5}
                  variant='outlined'
                  value={rejectionReason}
                  onChange={onChangeReason} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button onClick={closeFormDeclineCredit} fullWidth color='primary' variant='outlined'>Cancelar</Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button fullWidth color='primary' variant='contained' onClick={confirmDeclineCredit} disabled={rejectionReason ? false : true}>Aceptar</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </DialogContainer>
        <LoaderBackdrop open={loadingTable && loadingCompanies}/>
      </React.Fragment>

    </Container>
  );
};

export default VisaContainer;