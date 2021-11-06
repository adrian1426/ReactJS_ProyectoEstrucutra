import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from './../../common/dialog/dialogContainer/DialogContainer';
import DialogContent from './../../common/dialog/dialogContainer/DialogContent';
import DialogActions from './../../common/dialog/dialogContainer/DialogActions';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

const styles = {
  marginTop: {
    marginTop: '8px'
  },
  button: {
    width: '130px',
    borderRadius: '15px !important',
    marginLeft: '13px'
  }
};

const EmployeesListActionsEdit = props => {
  const { openEdit, selectedEmployeeEdit, closeEditEmployee, editEmployees } = props;
  const [employeeEdit, setEmployeeEdit] = useState(selectedEmployeeEdit);
  const { t } = useTranslation('employeesList');

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setEmployeeEdit({
      ...employeeEdit,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onEditEmployee = () => {
    editEmployees(employeeEdit);
    closeEditEmployee();
  };

  useEffect(() => {
    setEmployeeEdit(selectedEmployeeEdit);
  }, [selectedEmployeeEdit]);

  return (
    <DialogContainer
      open={openEdit}
      handleClose={closeEditEmployee}
      title={t('editEmployee.title', { name: employeeEdit?.name })}
    >
      <div>
        <DialogContent>
          <div>
            <Typography component="span">{t('editEmployee.creditAXS')}</Typography>
            <Switch
              checked={employeeEdit?.enableCredit ? employeeEdit.enableCredit : false}
              name='enableCredit'
              onChange={onChange}
            />
          </div>

          <TextField
            placeholder={t('editEmployee.creditAmount')}
            variant="outlined"
            style={styles.marginTop}
            fullWidth
            name='creditAmount'
            onChange={onChange}
            defaultValue={employeeEdit?.creditAmount}
            disabled={!employeeEdit?.enableCredit}
          />
        </DialogContent>

        <DialogActions>
          <Button
            style={styles.button}
            color="primary"
            variant="outlined"
            onClick={closeEditEmployee}
          >
            {t('editEmployee.actionCancel')}
          </Button>

          <Button
            style={styles.button}
            color="primary"
            variant="contained"
            onClick={onEditEmployee}
          >
            {t('editEmployee.actionAccept')}
          </Button>
        </DialogActions>
      </div>
    </DialogContainer>
  );
};

EmployeesListActionsEdit.propTypes = {
  openEdit: PropTypes.bool.isRequired,
  selectedEmployeeEdit: PropTypes.object,
  closeEditEmployee: PropTypes.func.isRequired,
  editEmployees: PropTypes.func.isRequired
};

EmployeesListActionsEdit.defaultProps = {
  selectedEmployeeEdit: {}
};

export default EmployeesListActionsEdit;