import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import UserContext from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    minWidth: '230px'
  }
};

const UsersContainerListOptions = props => {
  const { handleOpenForm } = props;
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('users');

  return !userState.isReadOnly ? (
    <Button
      style={styles.button}
      color="secondary"
      variant="contained"
      startIcon={<PersonIcon />}
      onClick={handleOpenForm}
    >
      {t('header.options.addUser')}
    </Button>
  ) : null;
};

UsersContainerListOptions.propTypes = {
  handleOpenForm: PropTypes.func.isRequired
};

export default UsersContainerListOptions;