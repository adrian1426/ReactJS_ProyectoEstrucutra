import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SubContainer from '../../common/Container/SubContainer';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ProductsFormCommissions from './ProductsFormCommissions';
import useForm from './../../../hooks/useForm';
import { periodicity, confirmations, moratoriumPeriods } from '../../../constants/catalogs';
import {
  fAnnualSubstituteInterest, fAnnualMoratoriumInterest, fAnnualMoratoriumInterestIVA, fMoratoriumInterestPeriod,
  fInterestAnnualIVA, fSupplementaryTerm, fPeriodRate, fAnnualSubstituteInterestIVA
} from '../../../constants/formulaProducts';
import { initialStateProductError } from './initialState';
import helper from '../../../helpers';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'react-i18next';
import Styles from './ProductsForm.module.css';

const ProductsForm = props => {
  const { initialState, companies, addProduct, redirectProductList } = props;
  const [commissions, setCommissions] = useState(initialState.commissions);
  const { newPropsCheck, newPropsInputValue, newPropsAutocomplete, fields, addField, setFields } = useForm(initialState);
  const [validationError, setValidationError] = useState(initialStateProductError);
  const { t } = useTranslation('productsForm');
  const isEdit = initialState.id ? true : false;

  const idCommission = () => {
    if (commissions.length === 0) {
      return 0;
    } else {
      const idsCommission = commissions.map(comm => ([comm['id']]));
      const idMax = Math.max(...idsCommission);
      return idMax;
    }
  };

  const idCommissionInit = idCommission();

  const handleAddCommission = commission => {
    const newCommission = {
      ...commission,
      id: idCommissionInit + 1,
      driverTerm: commission.driverTerm.value,
      vat: commission.vat.value
    };

    setCommissions([...commissions, newCommission]);
  };

  const editCommissionDropdown = (option, rowEdit) => {
    const newCommissions = commissions.map(com => {
      if (com.id === rowEdit.id) {
        return {
          ...com,
          [rowEdit.nameObj]: rowEdit.noObj ? option[rowEdit.valData] : option
        }
      }
      return com;
    });

    setCommissions(newCommissions);
  };

  const editCommissionText = (e, rowId) => {
    const { name, value } = e.target;

    const newCommissions = commissions.map(com => {
      if (com.id === rowId) {
        return {
          ...com,
          [name]: value
        }
      }
      return com;
    });

    setCommissions(newCommissions);
  };

  const deleteCommissions = rowCommission => {
    const newCommissions = commissions.filter(com => com.id !== rowCommission.id);
    setCommissions(newCommissions);
  };

  const validation = () => {
    const valName = helper.validationNull(fields.name);
    const valCompanyRef = helper.validationNull(fields.companyRef);
    const valAnnualRate = helper.validationNull(fields.annualRate);
    const valContractedTerm = helper.validationNull(fields.contractedTerm);
    const valSupplementaryTermFactor = helper.validationNull(fields.supplementaryTermFactor);
    const valPeriodicityRef = helper.validationNull(fields.periodicityRef);
    const valIVARate = helper.validationNull(fields.ivaRate);
    const valInterestCapitalization = helper.validationNull(fields.interestCapitalization);
    const valGracePeriod = helper.validationNull(fields.gracePeriod);
    const valMoratoriumPeriod = helper.validationNull(fields.moratoriumPeriod);
    const valCatWithoutIVA = helper.validationNull(fields.catWithoutIVA);
    const valMinimunTermApp = helper.validationNull(fields.minimunTermApp);
    const valMaximunTermApp = helper.validationNull(fields.maximunTermApp);
    const valMinRetentionPercentage = helper.validationNull(fields.minRetentionPercentage);
    const valMaxRetentionPercentage = helper.validationNull(fields.maxRetentionPercentage);

    setValidationError({
      name: valName,
      companyRef: valCompanyRef,
      annualRate: valAnnualRate,
      contractedTerm: valContractedTerm,
      supplementaryTermFactor: valSupplementaryTermFactor,
      periodicityRef: valPeriodicityRef,
      ivaRate: valIVARate,
      interestCapitalization: valInterestCapitalization,
      gracePeriod: valGracePeriod,
      moratoriumPeriod: valMoratoriumPeriod,
      catWithoutIVA: valCatWithoutIVA,
      minimunTermApp: valMinimunTermApp,
      maximunTermApp: valMaximunTermApp,
      minRetentionPercentage: valMinRetentionPercentage,
      maxRetentionPercentage: valMaxRetentionPercentage,
    });

    return valName || valCompanyRef || valAnnualRate || valContractedTerm || valSupplementaryTermFactor || valPeriodicityRef || valIVARate ||
      valInterestCapitalization || valGracePeriod || valMoratoriumPeriod || valCatWithoutIVA || valMinimunTermApp || valMaximunTermApp ||
      valMinRetentionPercentage || valMaxRetentionPercentage;
  };

  const handleAddProduct = () => {
    if (!validation()) {
      addProduct(fields, commissions);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const valCompanies = companies.length > 0 ? companies.filter(com => com.id === initialState.companyRef.id)[0] : null;
      const valConfirmations = confirmations.filter(con => con.value === initialState.interestCapitalization)[0];
      const valPeriodicities = periodicity.filter(per => per.id === initialState.periodicityRef.id)[0];
      const valMoratoriumPeriods = moratoriumPeriods.filter(mor => mor.id === initialState.moratoriumPeriod.id)[0];

      const newFields = {
        ...initialState,
        interestCapitalization: valConfirmations,
        periodicityRef: valPeriodicities,
        moratoriumPeriod: valMoratoriumPeriods,
        companyRef: valCompanies
      };

      setFields(newFields);
      setCommissions(initialState.commissions);
    }
  }, [initialState, setFields, companies, isEdit]);

  useEffect(() => {
    const annualRate = fields.annualRate;
    const daysPeriod = fields.periodicityRef?.daysPeriod || 0;
    const contractedTerm = fields.contractedTerm || 0;
    const supplementaryTermFactor = fields.supplementaryTermFactor || 0;

    const newAnnualSubstituteInterest = helper.roundTwo(fAnnualSubstituteInterest(annualRate));
    const newAnnualMoratoriumInterest = helper.roundTwo(fAnnualMoratoriumInterest(annualRate));
    const newAnnualMoratoriumInterestIVA = helper.roundTwo(fAnnualMoratoriumInterestIVA(annualRate));
    const newMoratoriumInterestPeriod = helper.roundTwo(fMoratoriumInterestPeriod(annualRate, daysPeriod));
    const newInterestAnnualIVA = helper.roundTwo(fInterestAnnualIVA(annualRate));
    const newSupplementaryTerm = fSupplementaryTerm(contractedTerm, supplementaryTermFactor);
    const newPeriodRate = helper.roundTwo(fPeriodRate(annualRate, daysPeriod));
    const newAnnualSubstituteInterestIVA = helper.roundTwo(fAnnualSubstituteInterestIVA(annualRate));

    addField('annualSubstituteInterest', newAnnualSubstituteInterest);
    addField('annualMoratoriumInterest', newAnnualMoratoriumInterest);
    addField('annualMoratoriumInterestIVA', newAnnualMoratoriumInterestIVA);
    addField('moratoriumInterestPeriod', newMoratoriumInterestPeriod);
    addField('interestAnnualIVA', newInterestAnnualIVA);
    addField('supplementaryTerm', newSupplementaryTerm);
    addField('periodRate', newPeriodRate);
    addField('annualSubstituteInterestIVA', newAnnualSubstituteInterestIVA);

  }, [fields.annualRate, fields.periodicityRef, fields.contractedTerm, fields.supplementaryTermFactor, addField]);

  return (
    <SubContainer>
      <div className={Styles.SubContainer}>
        <Grid container spacing={1}>

          <Grid item lg={3} md={4} xs={6}>
            <FormControlLabel
              control={<Checkbox {...newPropsCheck('isProductAdvance')} color='primary' />}
              label={t('product.advance')}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6} >
            <TextField
              label={t('product.name')}
              variant='outlined'
              fullWidth
              error={validationError.name}
              {...newPropsInputValue('name')}
              className={Styles.marginBottom}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={companies}
              getOptionLabel={option => option.businessName}
              size="small"
              className={Styles.marginBottom}
              disabled={fields.id ? true : false}
              {...newPropsAutocomplete('companyRef')}
              renderInput={params =>
                <TextField
                  {...params}
                  label={t('product.company')}
                  variant="outlined"
                  error={validationError.companyRef}
                />
              }
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.contracted')}
              variant='outlined'
              fullWidth
              className={Styles.marginBottom}
              error={validationError.contractedTerm}
              {...newPropsInputValue('contractedTerm')}
              InputProps={{
                type: 'number'
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.interestAnnual')}
              variant='outlined'
              fullWidth
              className={Styles.marginBottom}
              error={validationError.annualRate}
              {...newPropsInputValue('annualRate')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.factor')}
              variant='outlined'
              fullWidth
              error={validationError.supplementaryTermFactor}
              className={Styles.marginBottom}
              {...newPropsInputValue('supplementaryTermFactor')}
              InputProps={{
                type: 'number'
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={periodicity}
              getOptionLabel={option => option.name}
              size="small"
              className={Styles.marginBottom}
              {...newPropsAutocomplete('periodicityRef')}
              renderInput={params =>
                <TextField
                  {...params}
                  label={t('product.periodicity')}
                  variant="outlined"
                  error={validationError.periodicityRef}
                />
              }
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.rateIVA')}
              variant='outlined'
              fullWidth
              error={validationError.ivaRate}
              className={Styles.marginBottom}
              {...newPropsInputValue('ivaRate')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={confirmations}
              getOptionLabel={option => option.label}
              size="small"
              className={Styles.marginBottom}
              {...newPropsAutocomplete('interestCapitalization')}
              renderInput={params =>
                <TextField
                  {...params}
                  label={t('product.iterCapitalization')}
                  variant="outlined"
                  error={validationError.interestCapitalization}
                />
              }
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.grace')}
              variant='outlined'
              fullWidth
              error={validationError.gracePeriod}
              {...newPropsInputValue('gracePeriod')}
              className={Styles.marginBottom}
              InputProps={{
                type: 'number'
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.rateAnnual')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.annualSubstituteInterest} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <Autocomplete
              options={moratoriumPeriods}
              getOptionLabel={option => option.title}
              size="small"
              className={Styles.marginBottom}
              {...newPropsAutocomplete('moratoriumPeriod')}
              renderInput={params =>
                <TextField
                  {...params}
                  label={t('product.perMor')}
                  variant="outlined"
                  error={validationError.moratoriumPeriod}
                />
              }
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.rateMorAnnual')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.annualMoratoriumInterest} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.rateMorAnnualIva')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.annualMoratoriumInterestIVA} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.morPeriod')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.moratoriumInterestPeriod} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.catWithout')}
              variant='outlined'
              fullWidth
              error={validationError.catWithoutIVA}
              className={Styles.marginBottom}
              {...newPropsInputValue('catWithoutIVA')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.interstIVA')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.interestAnnualIVA} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.complementary')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={fields.supplementaryTerm}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.ratePeriod')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.periodRate} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.sustIva')}
              variant='standard'
              fullWidth
              className={`${Styles.marginBottom} ${Styles.TextField}`}
              disabled
              value={`${fields.annualSubstituteInterestIVA} %`}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.minApp')}
              variant='outlined'
              fullWidth
              error={validationError.minimunTermApp}
              className={Styles.marginBottom}
              {...newPropsInputValue('minimunTermApp')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">semanas</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.maxApp')}
              variant='outlined'
              fullWidth
              error={validationError.maximunTermApp}
              className={Styles.marginBottom}
              {...newPropsInputValue('maximunTermApp')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">semanas</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.minRetention')}
              variant='outlined'
              fullWidth
              error={validationError.minRetentionPercentage}
              className={Styles.marginBottom}
              {...newPropsInputValue('minRetentionPercentage')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item lg={3} md={4} xs={6}>
            <TextField
              label={t('product.maxRetention')}
              variant='outlined'
              fullWidth
              error={validationError.maxRetentionPercentage}
              className={Styles.marginBottom}
              {...newPropsInputValue('maxRetentionPercentage')}
              InputProps={{
                type: 'number',
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

        </Grid>

        <div className={Styles.Comissions}>
          <ProductsFormCommissions
            commissions={commissions}
            handleAddCommission={handleAddCommission}
            onEditCommissionDropdown={editCommissionDropdown}
            onEditCommissionText={editCommissionText}
            onDeleteCommissions={deleteCommissions}
          />
        </div>

        <div className={Styles.Action_Send}>
          {
            isEdit && (
              <Button
                variant='contained'
                color='secondary'
                className={Styles.Action_Send_Btn}
                onClick={redirectProductList}
              >
                {t('product.actionCancel')}
              </Button>
            )
          }

          <Button
            variant='contained'
            color='primary'
            endIcon={<SendIcon />}
            className={Styles.Action_Send_Btn}
            onClick={handleAddProduct}
          >
            {t('product.actionSend')}
          </Button>
        </div>
      </div>
    </SubContainer>
  );
};

ProductsForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  companies: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  redirectProductList: PropTypes.func.isRequired
};

export default ProductsForm;