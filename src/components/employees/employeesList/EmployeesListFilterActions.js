import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const styles = {
  width: '180px',
  marginLeft: '10px'
};

const EmployeesListFilterActions = props => {
  const { filterDisabled, cleanFilter, applyFilter } = props;
  const { t } = useTranslation('employeesList');

  return (
    <div>
      <Button
        color="primary"
        variant="outlined"
        style={styles}
        disabled={filterDisabled}
        onClick={cleanFilter}
      >
        {t('filters.actionClean')}
      </Button>

      <Button
        color="primary"
        variant="contained"
        style={styles}
        disabled={filterDisabled}
        onClick={applyFilter}
      >
        {t('filters.actionApply')}
      </Button>
    </div>
  );
};

EmployeesListFilterActions.propTypes = {
  filterDisabled: PropTypes.bool.isRequired,
  cleanFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired
};

export default EmployeesListFilterActions;