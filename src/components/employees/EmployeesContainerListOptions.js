import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import EmailIcon from '@material-ui/icons/Email';
import UserContext from '../../context/UserContext';
import { useTranslation } from 'react-i18next';

const styles = {
  button: {
    minWidth: '230px',
    marginLeft: '12px'
  },
  divInput: {
    display: 'none'
  }
};

const EmployeesContainerListOptions = props => {
  const { uploadEmployees, sendEmails, isSelectedData } = props;
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('employeesList');

  return !userState.isReadOnly ? (
    <React.Fragment>
      <div>
        <input
          accept=".xlsx"
          style={styles.divInput}
          id="contained-button-file"
          type="file"
          onChange={uploadEmployees}
        />

        <label htmlFor="contained-button-file">
          <Button
            style={styles.button}
            variant="contained"
            color="secondary"
            component="span"
            startIcon={<PublishIcon />}
          >
            {t('header.options.upload')}
          </Button>
        </label>
      </div>

      <Button
        style={styles.button}
        color="secondary"
        variant="contained"
        startIcon={<EmailIcon />}
        onClick={sendEmails}
        disabled={!isSelectedData}
      >
        {t('header.options.send')}
      </Button>
    </React.Fragment>
  ) : null;
};

EmployeesContainerListOptions.propTypes = {
  uploadEmployees: PropTypes.func.isRequired,
  sendEmails: PropTypes.func.isRequired,
  isSelectedData: PropTypes.bool.isRequired
};

export default EmployeesContainerListOptions;