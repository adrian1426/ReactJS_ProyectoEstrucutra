import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import Container from '../common/Container/Container';
import CompaniesList from './companiesList/CompaniesList';
import CompanyServices from './../../services/CompanyServices';
import CompaniesHeaderOptions from './CompaniesHeaderOptions';
import HomeContext from '../../context/HomeContext';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import UserContext from '../../context/UserContext';
import { companiesFormBase } from '../../constants/appRoutes';
import helpers from '../../helpers';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';

const CompaniesContainerList = (props) => {
  const { match, history } = props;
  const codeCountry = match.params.country;
  const [companies, setCompanies] = useState([]);
  const dispatch = useContext(HomeContext)[1];
  const { state: userState } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  const onAddCompany = () => {
    history.push(`/${companiesFormBase}/${codeCountry}`)
  };
  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);


  const getCompanies = useCallback(async () => {

    setIsLoading(true);
    setIsLoadingTable(true);

    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      setCompanies(response.data);
      setIsLoading(false);
      setIsLoadingTable(false);
    } else {
      setCompanies([]);
      setIsLoading(false);
      setIsLoadingTable(false);
      showMessage('info', '¡No se encontraron empresas en el sistema.!');

    }
  }, [codeCountry, showMessage]);

  const deleteCompany = async companyId => {
    const companyServices = new CompanyServices();
    const response = await companyServices.deleteCompany(codeCountry, companyId, userState.id);

    if (response?.status === 200) {
      getCompanies();
      dispatch(hideConfirmationAction());
      showMessage('success', `Empresa ${response.data.name} eliminada correctamente!`);
    } else {
      const message = `¡Error: ${response?.data?.detail}!`;
      showMessage('error', message);
    }
  };

  const confirmDeleteCompany = company => {

    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Eliminar Empresa',
        textSecundary: `¿Está seguro en dar de baja a la empresa <b>${company.name}</b>?`,
        actionConfirm: () => deleteCompany(company.id)
      }
    ));
  };

  const companiesDataTable = useMemo(() => (
    companies.map(item => {
      return {
        id: item.id,
        name: item.name,
        code: item.code,
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        createdAt: helpers.formatDate(item.createdAt),
        updatedAt: helpers.formatDate(item.updatedAt),
        createdAmountAt: item.createdAmountAt,
        createdAmountUser: item.createdAmountUser
      };
    })
  ), [companies]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return (
    <React.Fragment>
      <Container
        applicationName="Empresas"
        titleApplications="Listado de empresas"
        componentHeader={
          <CompaniesHeaderOptions
            {...{ history, codeCountry, onAddCompany }}
          />
        }
      >
        <CompaniesList
          companiesDataTable={companiesDataTable}
          onDeleteCompany={confirmDeleteCompany}
          history={history}
          codeCountry={codeCountry}
          isLoadingTable={isLoadingTable}
        />
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

export default CompaniesContainerList;