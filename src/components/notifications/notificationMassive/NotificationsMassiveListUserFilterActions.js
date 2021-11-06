import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
  width: '180px',
  marginLeft: '10px'
};

const NotificationsMassiveListUserFilterActions = () => {
  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        style={styles}
      >
        Limpiar Filtros
        </Button>

      <Button
        color="primary"
        variant="contained"
        style={styles}
      >
        Filtrar
        </Button>
    </div>
  );
};

export default NotificationsMassiveListUserFilterActions;