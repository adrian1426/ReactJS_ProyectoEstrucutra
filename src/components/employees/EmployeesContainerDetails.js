import React, { useEffect, useCallback, useState, useContext } from 'react';
import Container from '../common/Container/Container';
import EmployeesContainerDetailsOptions from './EmployeesContainerDetailsOptions';
import EmployeesDetails from './employeesDetails/EmployeesDetails';
import HomeContext from '../../context/HomeContext';
import UserContext from '../../context/UserContext';
import { showMessageAction } from '../../context/actions/message/messageAction';
import EmployeeServices from '../../services/EmployeeServices';
import { initialStateEmployee } from './employeesDetails/InitialState';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
// Prueba de cambio de datos en nuevo repositorio.
const EmployeesContainerDetails = (props) => {
  const { match } = props;
  const codeCountry = match.params.country;
  const employeeId = match.params.employeeId;
  const [employees, setEmployees] = useState(initialStateEmployee);
  const dispatch = useContext(HomeContext)[1];
  const { state: userState } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const getEmployeeById = useCallback(async () => {

    setIsLoading(true);
    setIsLoadingTable(true);
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getEmployeeId(codeCountry, employeeId);
    if (response?.status === 200) {
      setEmployees(response.data);
      setIsLoading(false);
      setIsLoadingTable(false);
    } else {
      setIsLoading(false);
      setIsLoadingTable(false);
      showMessage('error', '¡No se pudo obtener el detalle del empleado seleccionado!')
    }
  }, [codeCountry, employeeId, showMessage]);



  useEffect(() => {
    if (employeeId) {
      getEmployeeById();
    }
  }, [employeeId, getEmployeeById]);

  return (
    <React.Fragment>
      <Container
        applicationName="Empleados"
        titleApplications="Detalle del cliente"
        componentHeader={<EmployeesContainerDetailsOptions />}
      >
        <EmployeesDetails
          initialState={employees}
          codeCountry={codeCountry}
          isLoadingTable={isLoadingTable}
        />
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

export default EmployeesContainerDetails;