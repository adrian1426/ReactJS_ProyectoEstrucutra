import React from 'react';
import PropTypes from 'prop-types';
import Buttom from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GetAppIcon from '@material-ui/icons/GetApp';
import { CsvBuilder } from 'filefy';

const ExcelExport = (props) => {
  const { styles, title, nameCSV, columns, data } = props;

  const nameColumns = columns.map(item => item.label);

  const dataExcel = data.map(dat => {
    return columns.map(column => dat[column.fieldId])
  });

  const descargar = () => {
    new CsvBuilder(`${nameCSV}.csv`)
      .setColumns(nameColumns)
      .addRows(dataExcel)
      .exportFile();
  };

  return (
    <React.Fragment>
      <Buttom
        style={styles}
        color="secondary"
        variant="contained"
        startIcon={<GetAppIcon color="primary" />}
        onClick={descargar}
      >
        <Typography>
          {title}
        </Typography>
      </Buttom>
    </React.Fragment>
  );
};

ExcelExport.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string,
  nameCSV: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array
};

export default ExcelExport;