import { Button } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import React from 'react';

const RequestReportsListOptions = props => {
  const { downloadReport } = props;

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={downloadReport}
        startIcon={<SaveAltIcon />}
      >
        Descargar Reporte
      </Button>
    </div>
  );
};

export default RequestReportsListOptions;