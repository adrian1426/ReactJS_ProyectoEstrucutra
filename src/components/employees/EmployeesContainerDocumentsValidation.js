//Contenedor para el modulo validacion de documentos
import React, { useState, useContext, useCallback, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import CompanyServices from '../../services/CompanyServices';
import EmployeeServices from '../../services/EmployeeServices';

import Container from '../common/Container/Container';
import SubContainer from './../common/Container/SubContainer';
import EmployeesListDocuments from "./employeesListDocuments/EmployeesListDocuments";
import EmployeesListDocumentsFilter from './employeesListDocuments/EmployeesListDocumentsFilter';
import { documentsValidations } from '../../constants/catalogs';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';

const EmployeesContainerDocumentsValidation = props => {
  const { match, history } = props;
  const [companies, setCompanies] = useState([]);
  const { state: userState } = useContext(UserContext);
  const [listDocuments, setListDocuments] = useState([]);
  const [urlSigned, setUrlSigned] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isloadingCompanies, setLoadingCompanies] = useState(true);
  const [loadingDocument, setLoadingDocument] = useState(true);

  const codeCountry = match.params.country;

  const columns = [
    { fieldId: 'documentType', label: 'Documento', },
    { fieldId: 'status', label: 'Estatus', },
    { fieldId: 'create', label: 'Creación', },
  ]

  const getCompanies = useCallback(async () => {
    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);
    if (response?.status === 200 && response.data.length > 0) {
      const companiesActives = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
      setCompanies(companiesActives);
      setLoadingCompanies(false);
    } else {
      setCompanies([]);
      setLoadingCompanies(false);
    }
  }, [codeCountry]);

  const getDocumetsValidation = useCallback(async (data) => {
    const employeeServices = new EmployeeServices();
    const response = await employeeServices.getDocumetsValidations(codeCountry, data);
    if (response?.status === 200 && response.data.length > 0) {
      console.log(response);
      buildData(response.data);
      setLoading(false);
    } else {
      setListDocuments([]);
      setLoading(false);

    }
  }, [codeCountry]);

  const buildData = (response) => {
    const d = response.map(item => {
      return {
        company: item.companyRef ? item.companyRef.businessName : '',
        name: item.userRef ? item.userRef.firstName : '',
        event: item.id ? item.id : 0,
        create: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '00/00/0000',
        documents: buildDocumentsObject(item.documents, item.userDocuments)
      }
    });
    setListDocuments(d);
  };

  //concatena los 2 arreglos de documentos que trae el servicio
  const buildDocumentsObject = (documents, documentsUser) => {
    const docs = documents.map(item => {
      return {
        id: item.id ? item.id : '',
        url: item.uri ? item.uri : '',
        create: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
        status: item.statusRef ? item.statusRef.name : '',
        documentType: item.documentRef ? item.documentRef.name : ''
      }
    });
    const userDocs = documentsUser.map(item => {
      return {
        id: item.id ? item.id : '',
        url: item.uri ? item.uri : '',
        create: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '',
        status: item.statusRef ? item.statusRef.name : '',
        documentType: item.documentRef ? item.documentRef.name : ''
      }
    });
    const docsConcated = docs.concat(userDocs);
    return docsConcated;
  };

  const getDocumentUrl = useCallback(async (e) => {
    setLoadingDocument(true);
    const employeeServices = new EmployeeServices();
    console.log('obteniendo la URL');
    const splittedUrl = e.split('gs://alphacredit-wallet-dev.appspot.com/');
    const response = await employeeServices.getDocumentUrl(codeCountry, splittedUrl[1], true);
    if (response?.status === 200) {
      setUrlSigned(response.data.url);
      setLoadingDocument(false);
      console.log(urlSigned);
    }
  }, [codeCountry]);

  const cleanFilter = () => {
    setLoading(true);
    getDocumetsValidation({name:''});
  }

  const filterData = (e) => {
    setLoading(true);
    getDocumetsValidation(e);
  }


  useEffect(() => {
    getCompanies();
    getDocumetsValidation({name:''});
  }, [getCompanies, getDocumetsValidation]);


  return (
    <Container
      applicationName='Empleados'
      titleApplications='Documentos validación'
    >
      <SubContainer>
        <EmployeesListDocumentsFilter
          companies={companies}
          documents={documentsValidations}
          loadingData={isLoading}
          cleanFilter={cleanFilter}
          filterData={filterData}
          placeholderDocuments={'Estatus de documento...'}
        />
        <EmployeesListDocuments
          listDocuments={listDocuments}
          isLoading={isLoading}
          loadingDocument={loadingDocument}
          columnsDetail={columns}
          getDocumentUrl={getDocumentUrl}
          urlSigned={urlSigned}
          isValidation={true}
        />
      </SubContainer>
      <LoaderBackdrop open={isLoading && isloadingCompanies}/>
    </Container>
  );
};

export default EmployeesContainerDocumentsValidation;