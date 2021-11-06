import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    borderRadius: '15px !important',
    marginLeft: '13px',
    minWidth: '130px'
  }
};


const UsersListAddEditFormActions = props => {
  const { onClose, onAddUser, onEditUser, isEdit } = props;
  const { t } = useTranslation('users');
  const title = isEdit ? t('form.editAction') : t('form.addAction');

  return (
    <React.Fragment>
      <Button
        style={styles.button}
        color="primary"
        variant="outlined"
        onClick={onClose}
      >
        {t('form.cancelAction')}
      </Button>

      <Button
        style={styles.button}
        color="primary"
        variant="contained"
        onClick={isEdit ? onEditUser : onAddUser}
      >
        {title}
      </Button>
    </React.Fragment>
  );
};

UsersListAddEditFormActions.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired
};

export default UsersListAddEditFormActions;