import React, { useState, useCallback, useEffect, useMemo,useContext  } from 'react';
import TextField from '@material-ui/core/TextField';
import Subcontainer from '../../common/Container/SubContainer';
import GripWrapper from '../../common/gridWrapper/GridWrapper';
import Grid from '@material-ui/core/Grid';
import Styles from './EmployeesDetails.module.css';
import CreditTable from './CreditTable';
import AdvancementTable from './AdvancementTable';
import EmployeesDetailsFilter from './EmployeesDetailsFilter';
import EmployeesDetailsTable from './EmployeesDetailsTable';
import useForm from '../../../hooks/useForm';
import EmployeeServices from '../../../services/EmployeeServices';
import helpers from '../../../helpers';
import HomeContext from '../../../context/HomeContext';
import { showMessageAction } from '../../../context/actions/message/messageAction';

const EmployeesDetails = (props) => {
  const { codeCountry, initialState, isLoadingTable } = props;
  const { fields, setFields } = useForm(initialState);
  const [dataAdvances, setDataAdvances] = useState([]);
  const [dataCredits, setDataCredits] = useState([]);
  const [idPayments, setIdPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoadingTablePayments, setIsLoadingTablePayments] = useState(false);
  const dispatch = useContext(HomeContext)[1];

  const onViewPayments = transaction => {
    setIdPayments(transaction.id)

  };
  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const getPaymentsByTransaction = useCallback(async () => {
    setIsLoadingTablePayments(true);
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.payments(codeCountry, idPayments, 10);
    if (response?.status === 200 && response.data.length>0) {
      setPayments(response.data);
      setIsLoadingTablePayments(false);
    } else {
      setIsLoadingTablePayments(false);
     // showMessage('error', '¡No se encontraron movimientos en el sistema.!');

    }
  }, [codeCountry, idPayments]);

  const dataAdvancesTransform = useMemo(() => (
    dataAdvances?.map(item => {
      return {
        id: item.id,
        createdAt: helpers.formatDate(item.createdAt),
        approvedAmount: helpers.formatPeso(item.approvedAmount),
        interestRate: item.interestRate,
        comission: helpers.formatPeso(item.comission),
        balance: helpers.formatPeso(item.balance),
      };
    })
  ), [dataAdvances]);

  const dataCreditsTransform = useMemo(() => (
    dataCredits?.map(item => {
      return {
        id: item.id,
        createdAt: helpers.formatDate(item.createdAt),
        approvedAmount: helpers.formatPeso(item.approvedAmount),
        interestRate: item.interestRate,
        comission: helpers.formatPeso(item.comission),
        balance: helpers.formatPeso(item.balance),
      };
    })
  ), [dataCredits]);

  const paymentsTransform = useMemo(() => (
    payments?.map(item => {
      return {
        id: item.id,
        createdAt: helpers.formatDate(item.createdAt),
        folio: item.folio,
        interestRate: item.interestRate,
        capitalPayments: item.capitalPayments,
        interestPayments: item.interestPayments,
        ivaPayments: item.ivaPayments,
        
      };
    })
  ), [payments]);

  useEffect(() => {
    if (idPayments) {
      getPaymentsByTransaction();
    }
  }, [idPayments, getPaymentsByTransaction]);

  useEffect(() => {
    setDataAdvances(initialState.requests?.advances);
    setDataCredits(initialState.requests?.credits);
    setFields(initialState);
  }, [initialState, setFields]);

  return (
    <Subcontainer>
      <Grid container spacing={4} className={Styles.formContainer}>
        <Grid item lg={12} md={12} xs={12}>
          <label className={Styles.subTitle}><b>Datos Generales</b></label>
        </Grid>
        <Grid container spacing={6} className={Styles.formContainer}>
          <GripWrapper>
            <label><b>Nombre</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.name}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Empresa</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.companyRef?.businessName ? fields.companyRef.businessName : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>No.Empleado</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.idEmployee}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Periodicidad</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.userRef?.periodicityRef? fields.userRef?.periodicityRef.name: '-'}`}
            />
          </GripWrapper>
          {codeCountry !== 'co' ?
            <GripWrapper>
              <label><b>CURP</b></label>
              <TextField
                variant="standard"
                fullWidth
                value={`${fields.userData[0]?.value ? fields.userData[0].value : '-'}`}
              />
            </GripWrapper> :
            <GripWrapper>
              <label><b>Tipo de Documento</b></label>
              <label className={Styles.text}>Cresencio</label>
            </GripWrapper>}
          {codeCountry !== 'co' ?
            <GripWrapper>
              <label><b>RFC</b></label>
              <TextField
                variant="standard"
                fullWidth
                value={`${fields.userData[1]?.value ? fields.userData[1].value : '-'}`}
              />
            </GripWrapper> :
            <GripWrapper>
              <label><b>Cédula</b></label>
              <TextField
                variant="standard"
                fullWidth
                value={`${'-'}`}
              />
            </GripWrapper>}
          <GripWrapper>
            <label><b>Dirección</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.addresses[0]?.address ? fields.addresses[0]?.address : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Teléfono</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.phones[0]?.number ? fields.phones[0]?.number : '-'}`}
            />
          </GripWrapper>
        </Grid>
        <Grid item lg={12} md={12} xs={12}>
          <label className={Styles.subTitle}><b>Datos de Alta</b></label>
        </Grid>
        <Grid container spacing={6} className={Styles.formContainer}>
          <GripWrapper>
            <label><b>Fecha de Registro</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.createdAt ? helpers.formatDate(fields.createdAt) : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Fecha de Envío de Documentos</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.documentDate ? helpers.formatDate(fields.documentDate) : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Fecha de Firma</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${'-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Estatus de Alta</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.employeeStatusRef?.name ? fields.employeeStatusRef?.name : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Fecha de Último Préstamo</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.requests?.credits.length > 0 ? helpers.formatDate(fields.requests?.credits[0]?.createdAt) : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Fecha de Último Adelanto</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.requests?.advances.length > 0 ? helpers.formatDate(fields.requests?.advances[0].createdAt) : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Crédito AXS</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.requests?.credits ? fields.requests?.credits.length > 0 ? 'Sí' : 'No' : '-'}`}
            />
          </GripWrapper>
          <GripWrapper>
            <label><b>Adelanto AXS</b></label>
            <TextField
              variant="standard"
              fullWidth
              value={`${fields.requests?.advances ? fields.requests?.advances.length > 0 ? 'Sí' : 'No' : '-'}`}
            />
          </GripWrapper>
        </Grid>
        <Grid container spacing={2} className={Styles.tableContainer}>
          <Grid lg={6} md={12} item xs={12} >
            <CreditTable credits={dataCreditsTransform} onViewPayments={onViewPayments} isLoadingTable={isLoadingTable}></CreditTable>
          </Grid>
          <Grid lg={6} md={12} item xs={12} >
            <AdvancementTable advancements={dataAdvancesTransform} onViewPayments={onViewPayments} isLoadingTable={isLoadingTable}></AdvancementTable>
          </Grid>
          <Grid lg={12} md={12} item xs={12} >
            <EmployeesDetailsFilter></EmployeesDetailsFilter>
          </Grid>
          <Grid lg={12} md={12} item xs={12} >
            <EmployeesDetailsTable payments={paymentsTransform} isLoadingTable={isLoadingTablePayments}></EmployeesDetailsTable>
          </Grid>
        </Grid>

      </Grid>
    </Subcontainer>
  );
};

export default EmployeesDetails;