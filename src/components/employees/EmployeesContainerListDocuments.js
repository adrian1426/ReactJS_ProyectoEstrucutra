import React, { useState, useCallback, useEffect, useContext, useMemo } from 'react';
import Container from '../common/Container/Container';
import SubContainer from './../common/Container/SubContainer';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import EmployeesListDocuments from './employeesListDocuments/EmployeesListDocuments';
import EmployeesListDocumentsFilter from './employeesListDocuments/EmployeesListDocumentsFilter';
import CompanyServices from './../../services/CompanyServices';
import UserContext from '../../context/UserContext';
import EmployeeServices from '../../services/EmployeeServices';
import { documentsTypes } from '../../constants/catalogs';

const EmployeesContainerListDocuments = props => {
  const { match, history } = props;
  const [companies, setCompanies] = useState([]);
  const { state: userState } = useContext(UserContext);
  const codeCountry = match.params.country;
  const [listDocuments, setListDocuments] = useState([]);
  const [isloadingCompanies, setLoadingCompanies] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [documentUrlSigned, setDocumentUrlSigned] = useState('');
  const [loadingDocument, setLoadingDocument] = useState(true);
  const columns = [
    { fieldId: 'documentType', label: 'Tipo Documento', },
    { fieldId: 'create', label: 'Creación', },
  ];

  const getCompanies = useCallback(async () => {
    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      const companiesActive = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
      setCompanies(companiesActive);
      setLoadingCompanies(false);
    } else {
      setLoadingCompanies(false);
      setCompanies([]);
    }
  }, [codeCountry]);

  const getListDocuments = useCallback(async (data) => {
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getListDocuments(codeCountry, data);
    if (response?.status === 200 && response.data.length > 0) {
      buildData(response.data);
      setLoading(false);
    }
    else {
      setListDocuments([]);
      setLoading(false);
    }

  }, [codeCountry]);

  //adapta los datos que vienen del servicio para que sean leidos en las tablas correspondientes
  const buildData = (data) => {
    const d = data.map(item => {
      return {
        event: item.id,
        company: item.companyRef ? item.companyRef.businessName : 'Pendiente',
        name: item.userRef ? item.userRef.email : 'Nada de nada',
        create: new Date(item.createdAt).toLocaleDateString(),
        documents: item.documents.map(item => {
          return {
            id: item.id,
            documentType: item.documentRef.name?item.documentRef.name : '',
            create: new Date(item.createdAt).toLocaleDateString(),
            url: item.uri
          }
        })
      }
    });
    setListDocuments(d)
  }
  //obtiene la url firmada del documento y la envia al componenente de detalle para su visualizacion
  const getDocumentUrl = useCallback(async (e) => {
    setLoadingDocument(true)
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getDocumentUrl(codeCountry, e, false);
    if (response?.status === 200) {
      setDocumentUrlSigned(response.data.url);
      setLoadingDocument(false);
    }
  }, [codeCountry]);

  const filterData = (e) => {
    setLoading(true);
    getListDocuments(e);
  }

  const cleanFilter = () => {
    setLoading(true);
    getListDocuments({});
  }

  useEffect(() => {
    getCompanies();
    getListDocuments({});
    setLoading(true)
  }, [getCompanies, getListDocuments, setLoading]);

  return (
    <Container
      applicationName='Empleados'
      titleApplications='Listado de documentos'
    >
      <SubContainer>
        <EmployeesListDocumentsFilter
          companies={companies}
          documents={documentsTypes}
          filterData={filterData}
          cleanFilter={cleanFilter}
          loadingData={isLoading}
          placeholderDocuments={'Tipo de documento...'} />
        <EmployeesListDocuments
          listDocuments={listDocuments}
          isLoading={isLoading}
          columnsDetail={columns}
          getDocumentUrl={getDocumentUrl}
          loadingDocument={loadingDocument}
          urlSigned={documentUrlSigned} />
      </SubContainer>
      <LoaderBackdrop open={isLoading && isloadingCompanies}/>
    </Container>
  );
};

export default EmployeesContainerListDocuments;