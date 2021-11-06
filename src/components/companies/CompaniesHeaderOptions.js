import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';

const styles = {
  button: {
    height: '40px',
    width: '40%',
    marginLeft: '10px'
  }
};

const CompaniesHeaderOptions = props => {
  const { onAddCompany } = props;

  return (
    <React.Fragment>

      <Button
        style={styles.button}
        color="secondary"
        variant="contained"
        startIcon={<PublishIcon color="primary" />}
        onClick={onAddCompany}

      >
        <Typography>Cargar Empresas</Typography>
      </Button>


    </React.Fragment>
  );
};

export default CompaniesHeaderOptions;