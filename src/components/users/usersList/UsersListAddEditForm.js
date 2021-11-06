import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContent from './../../common/dialog/dialogContainer/DialogContent';
import DialogActions from './../../common/dialog/dialogContainer/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useForm from '../../../hooks/useForm';
import UsersListAddEditFormActions from './UsersListAddEditFormActions';
import helpers from '../../../helpers';
import { useTranslation } from 'react-i18next';
import Styles from './UsersListAddEditForm.module.css';

const reEmail = new RegExp('\\S+@\\S+\\.\\S+');

const UsersListAddEditForm = props => {
  const { companies, userEdit, onClose, onAddUser, onEditUser, types } = props;
  const { t } = useTranslation('users');

  const typeSelected = userEdit?.profileId ?
    types.filter(type => type.id === userEdit.profileId)[0] :
    null;

  const companieSelected = userEdit?.companyId ?
    companies.filter(company => company.id === userEdit.companyId)[0] :
    null;

  const stateInitial = {
    id: userEdit?.id,
    email: userEdit?.email,
    isActive: userEdit?.isActive === true,
    type: typeSelected,
    company: companieSelected
  };

  const { newPropsInput, newPropsCheck, newPropsAutocomplete, fields } = useForm(stateInitial);
  const [validationError, setValidationError] = useState({ email: false, type: false, company: false });

  const showCompany = fields?.type?.isHR === true;
  const helpEmail = validationError.email && t('form.validationEmail');

  const addUser = () => {
    if (!validation()) {
      onAddUser(fields);
    }
  };

  const editUser = () => {
    if (!validation()) {
      onEditUser(fields);
    }
  };

  const validation = () => {
    const valEmailError = !reEmail.test(fields.email);
    const valTypeError = helpers.validationNull(fields.type?.id);
    const valCompanyError = showCompany ? helpers.validationNull(fields.company?.id) : false;

    setValidationError({
      email: valEmailError,
      type: valTypeError,
      company: valCompanyError
    });

    return valEmailError || valTypeError || valCompanyError;
  };

  return (
    <div className={Styles.Form}>
      <DialogContent>
        <TextField
          placeholder={t('form.email')}
          variant="outlined"
          fullWidth
          helperText={helpEmail}
          error={validationError.email}
          {...newPropsInput('email')}
        />

        <div className={Styles.Form_Status}>
          <Typography component="span">{t('form.status')}</Typography>
          <Switch
            {...newPropsCheck('isActive')}
          />
        </div>

        <Autocomplete
          options={types}
          getOptionLabel={option => option.name}
          size="small"
          classes={{ listbox: Styles.ListBox }}
          {...newPropsAutocomplete('type')}
          renderInput={params =>
            <TextField
              {...params}
              label={t('form.rol')}
              variant="outlined"
              error={validationError.type}
            />
          }
        />

        {
          showCompany && (
            <Autocomplete
              options={companies}
              getOptionLabel={option => option.name}
              size="small"
              className={Styles.Form_Business}
              {...newPropsAutocomplete('company')}
              renderInput={params =>
                <TextField
                  {...params}
                  label={t('form.company')}
                  variant="outlined"
                  error={validationError.company}
                />
              }
            />
          )
        }
      </DialogContent>

      <DialogActions>
        <UsersListAddEditFormActions
          onClose={onClose}
          onAddUser={addUser}
          onEditUser={editUser}
          isEdit={!!userEdit}
        />
      </DialogActions>
    </div>
  );
};

UsersListAddEditForm.propTypes = {
  companies: PropTypes.array.isRequired,
  userEdit: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAddUser: PropTypes.func.isRequired,
  onEditUser: PropTypes.func.isRequired,
  types: PropTypes.array.isRequired
};

UsersListAddEditForm.defaultProps = {
  userEdit: null
};

export default UsersListAddEditForm;