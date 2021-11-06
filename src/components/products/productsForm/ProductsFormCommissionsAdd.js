import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../../common/dialog/dialogContainer/DialogContainer';
import DialogContent from '../../common/dialog/dialogContainer/DialogContent';
import DialogActions from '../../common/dialog/dialogContainer/DialogActions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';
import ProductsFormCommissionsActions from './ProductsFormCommissionsAddActions';
import useForm from '../../../hooks/useForm';
import { initialStateCommission, initialStateCommissionError } from './initialState';
import { collectMoments, fixedVariable, drivers, confirmations } from '../../../constants/catalogs';
import { useTranslation } from 'react-i18next';
import helpers from '../../../helpers';
import Styles from './ProductsFormCommissionsAdd.module.css';

const DivMultiElement = (props) => {
  return (
    <div className={`${Styles.DivMultiElement} ${Styles.SpaceTop}`}>
      <div className={Styles.DivMultiElement__Width}>
        {props.children[0]}
        {props.children[1]}
      </div>

      {props.children[2] && (
        <div className={Styles.DivMultiElement__Width}>
          {props.children[2]}
          {props.children[3]}
        </div>
      )}
    </div>
  );
};

const ProductsFormCommissionsAdd = props => {
  const { openForm, handleCloseForm, title, handleAddCommission } = props;
  const { newPropsInput, newPropsAutocomplete, fields, setFields } = useForm(initialStateCommission);
  const [validationError, setValidationError] = useState(initialStateCommissionError);
  const { t } = useTranslation('productsForm');

  const validation = () => {
    const valName = helpers.validationNull(fields.name);
    const valCollectMoment = helpers.validationNull(fields.collectMoment);
    const valFixedVariable = helpers.validationNull(fields.fixedVariable);
    const valDriver = helpers.validationNull(fields.driver);
    const valMinType = helpers.validationNull(fields.minType);
    const valMinDriver = helpers.validationNull(fields.minDriver);
    const valMaxType = helpers.validationNull(fields.maxType);
    const valMaxDriver = helpers.validationNull(fields.maxDriver);
    const valDriverTerm = helpers.validationNull(fields.driverTerm);
    const valCommissionCost = helpers.validationNull(fields.commissionCost);
    const valVAT = helpers.validationNull(fields.vat);
    const valPercentageSaved = helpers.validationNull(fields.percentageSaved);
    const valPaymentOrder = helpers.validationNull(fields.paymentOrder);

    setValidationError({
      name: valName,
      collectMoment: valCollectMoment,
      fixedVariable: valFixedVariable,
      driver: valDriver,
      minType: valMinType,
      minDriver: valMinDriver,
      maxType: valMaxType,
      maxDriver: valMaxDriver,
      driverTerm: valDriverTerm,
      commissionCost: valCommissionCost,
      vat: valVAT,
      percentageSaved: valPercentageSaved,
      paymentOrder: valPaymentOrder
    });

    return valName || valCollectMoment || valFixedVariable || valDriver || valMinType || valMinDriver ||
      valMaxType || valMaxDriver || valDriverTerm || valCommissionCost || valVAT || valPercentageSaved || valPaymentOrder;
  };

  const onAddCommission = () => {
    if (!validation()) {
      handleAddCommission(fields);
      handleCloseForm();
      setFields(initialStateCommission);
    }
  };

  const onCancel = () => {
    handleCloseForm();
    setFields(initialStateCommission);
    setValidationError(initialStateCommissionError);
  };

  return (
    <DialogContainer
      open={openForm}
      handleClose={handleCloseForm}
      title={title}
    >
      <div className={Styles.Container}>
        <DialogContent>
          <TextField
            placeholder={t('formComm.name')}
            variant='outlined'
            fullWidth
            error={validationError.name}
            {...newPropsInput('name')}
          />

          <div className={Styles.SpaceTop}>
            <Typography>{t('formComm.collectMom')}</Typography>
            <Autocomplete
              options={collectMoments}
              getOptionLabel={option => option.moment}
              size="small"
              {...newPropsAutocomplete('collectMoment')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.collectMoment}
                />}
            />
          </div>

          <DivMultiElement>
            <Typography>{t('formComm.fixVar')}</Typography>
            <Autocomplete
              options={fixedVariable}
              getOptionLabel={option => option.type}
              size="small"
              {...newPropsAutocomplete('fixedVariable')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.fixedVariable}
                />}
            />

            <Typography>{t('formComm.driver')}</Typography>
            <Autocomplete
              options={drivers}
              getOptionLabel={option => option.driver}
              size="small"
              {...newPropsAutocomplete('driver')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.driver}
                />}
            />
          </DivMultiElement>

          <DivMultiElement>
            <Typography>{t('formComm.minType')}</Typography>
            <Autocomplete
              options={fixedVariable}
              getOptionLabel={option => option.type}
              size="small"
              {...newPropsAutocomplete('minType')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.minType}
                />}
            />

            <Typography>{t('formComm.minDriver')}</Typography>
            <Autocomplete
              options={drivers}
              getOptionLabel={option => option.driver}
              size="small"
              {...newPropsAutocomplete('minDriver')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.minDriver}
                />}
            />
          </DivMultiElement>

          <DivMultiElement>
            <Typography>{t('formComm.maxType')}</Typography>
            <Autocomplete
              options={fixedVariable}
              getOptionLabel={option => option.type}
              size="small"
              {...newPropsAutocomplete('maxType')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.maxType}
                />}
            />

            <Typography>{t('formComm.maxDriver')}</Typography>
            <Autocomplete
              options={drivers}
              getOptionLabel={option => option.driver}
              size="small"
              {...newPropsAutocomplete('maxDriver')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.maxDriver}
                />}
            />
          </DivMultiElement>

          <DivMultiElement>
            <Typography>{t('formComm.driverTerm')}</Typography>
            <Autocomplete
              options={confirmations}
              getOptionLabel={option => option.label}
              size="small"
              {...newPropsAutocomplete('driverTerm')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.driverTerm}
                />}
            />
          </DivMultiElement>

          <DivMultiElement>
            <Typography>{t('formComm.cost')}</Typography>
            <TextField
              placeholder='Ej. 5% o 4,000...'
              variant='outlined'
              fullWidth
              error={validationError.commissionCost}
              {...newPropsInput('commissionCost')}
            />

            <Typography>{t('formComm.vat')}</Typography>
            <Autocomplete
              options={confirmations}
              getOptionLabel={option => option.label}
              size="small"
              {...newPropsAutocomplete('vat')}
              renderInput={params =>
                <TextField
                  {...params}
                  placeholder={t('formComm.select')}
                  variant="outlined"
                  error={validationError.vat}
                />}
            />
          </DivMultiElement>

          <DivMultiElement>
            <Typography>{t('formComm.perSaved')}</Typography>
            <TextField
              variant='outlined'
              fullWidth
              error={validationError.percentageSaved}
              {...newPropsInput('percentageSaved')}
              inputProps={{
                type: 'number'
              }}
            />

            <Typography>{t('formComm.payOrder')}</Typography>
            <TextField
              placeholder='Ej. 2, 0(si es N/A)...'
              variant='outlined'
              fullWidth
              error={validationError.paymentOrder}
              {...newPropsInput('paymentOrder')}
              inputProps={{
                type: 'number'
              }}
            />
          </DivMultiElement>
        </DialogContent>

        <DialogActions>
          <ProductsFormCommissionsActions
            onClose={onCancel}
            onAddCommission={onAddCommission}
          />
        </DialogActions>
      </div>
    </DialogContainer>
  );
};

ProductsFormCommissionsAdd.propTypes = {
  openForm: PropTypes.bool.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleAddCommission: PropTypes.func.isRequired
};

export default ProductsFormCommissionsAdd;