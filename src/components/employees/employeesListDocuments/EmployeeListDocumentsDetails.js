import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../common/table/Table';
import EmployeeListDocumentViewer from './EmployeeListDocumentViewer';
const EmployeeListDocumentsDetails = props => {
  const { listDocuments, columns, docUrl, urlSigned, isValidation, loadingDocument } = props;
  const [openDocument, setOpenDocument] = useState(false);
  const actions = () => ([{
    Icon: VisibilityIcon,
    tooltip: 'Ver documento',
    onClick: (e) => { docUrl(e.url); setOpenDocument(true) }
  }])

  const closeDocument = () => {
    setOpenDocument(false);
  }


  return (
    <div>
      <Table
        columns={columns}
        data={listDocuments}
        actions={actions}
      />
      <EmployeeListDocumentViewer
        openDocument={openDocument}
        closeDocument={closeDocument}
        urlSigned={urlSigned}
        validation={isValidation}
        loadingDocument={loadingDocument}
      />
    </div>
  );
};

export default EmployeeListDocumentsDetails;