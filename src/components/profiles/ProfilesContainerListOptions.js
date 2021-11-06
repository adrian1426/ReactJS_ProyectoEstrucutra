import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    minWidth: '230px'
  }
};

const ProfilesContainerListOptions = props => {
  const { handleOpenForm } = props;
  const { t } = useTranslation('userProfiles');

  return (
    <Button
      style={styles.button}
      color="secondary"
      variant="contained"
      startIcon={<PersonIcon />}
      onClick={handleOpenForm}
    >
      {t('header.options.addProfile')}
    </Button>
  );
};

ProfilesContainerListOptions.propTypes = {
  handleOpenForm: PropTypes.func.isRequired
};

export default ProfilesContainerListOptions;