import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = {
  button: {
    borderRadius: '15px !important',
    marginLeft: '13px',
    minWidth: '130px'
  }
};

const ProfilesListAddEditFormActions = props => {
  const { onClose, onAddProfile, onEditProfile, isEdit } = props;
  const title = isEdit ? 'Editar Perfil' : 'Agregar Perfil';

  return (
    <React.Fragment>
      <Button
        style={styles.button}
        color="primary"
        variant="outlined"
        onClick={onClose}

      >
        Cancelar
      </Button>

      <Button
        style={styles.button}
        color="primary"
        variant="contained"
        onClick={isEdit ? onEditProfile : onAddProfile}
        type="submit"
        form="prueba"
      >
        {title}
      </Button>
    </React.Fragment>
  );
};

ProfilesListAddEditFormActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddProfile: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};

export default ProfilesListAddEditFormActions;