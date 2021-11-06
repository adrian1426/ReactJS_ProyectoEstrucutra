import React from 'react';
import Table from '../../common/table/Table';

import EmployeesListDocumentsDetails from './EmployeeListDocumentsDetails';

import Styles from './EmployeeListDocuments.module.css';




const EmployeesListDocuments = props => {

  const { listDocuments, isLoading, columnsDetail, getDocumentUrl, urlSigned, isValidation, loadingDocument } = props;
  const columns = [
    { fieldId: 'company', label: 'Empresa' },
    { fieldId: 'name', label: 'Nombre Cliente' },
    { fieldId: 'event', label: 'Evento' },
    { fieldId: 'create', label: 'Creación' },
  ];

  const docUrl = (e) => {
    getDocumentUrl(e);//envia un emmit para obtener la URL firmada del documento.
  }

  const collapse = row => (
    <EmployeesListDocumentsDetails
      listDocuments={row.documents}
      columns={columnsDetail}
      docUrl={docUrl}
      urlSigned={urlSigned}
      loadingDocument={loadingDocument}
      isValidation={isValidation}
    />
  );


  return (
    <div className={Styles.Content_List}>
      <Table
        columns={columns}
        data={listDocuments}
        detailCollapse={collapse}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmployeesListDocuments;