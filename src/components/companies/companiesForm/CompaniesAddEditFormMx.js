import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SubContainer from '../../common/Container/SubContainer';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Styles from './Companies.module.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ChipMailList from './ChipMailList';
import Buttom from '@material-ui/core/Button';
import useForm from '../../../hooks/useForm';
import { confirmations, customerTypes, paymentTypes, cutDays, periodicity } from '../../../constants/catalogs';
import TableExtraFields from './TableExtraFields';
import GripWrapper from '../../common/gridWrapper/GridWrapper';
import { initialStateCompanyError } from './InitialState';
import helper from '../../../helpers';

const Wrapper = (props) => {
    return (
        <Grid item lg={12} md={12} xs={12}>
            {props.children}
        </Grid>
    );

}
const CompaniesAddEditFormMx = (props) => {
    const { initialState, addCompany } = props;
    const { newPropsInputValue, newPropsAutocomplete, newPropsCheck, fields, setFields } = useForm(initialState);
    const [emailNotifications, setEmailNotifications] = useState(initialState.emailNotification);
    const [extraFields, setExtraFields] = useState(initialState.extraField);
    const [validationError, setValidationError] = useState(initialStateCompanyError);

    const addEmailNotification = (emails) => {

        setEmailNotifications([...emailNotifications, emails])
    }

    const addExtraFields = (title) => {
        setExtraFields(title)
    }
    const handleAddCompany = () => {
        if (!validation()) {
            addCompany(fields, emailNotifications, extraFields)

        }
    };
    const validation = () => {
        const valName = helper.validationNull(fields.name);
        const valCode = helper.validationNull(fields.code);
        const valCustomerRef = helper.validationNull(fields.customerRef);
        const valPaymentPeriodicityRef = helper.validationNull(fields.paymentPeriodicityRef);
        const valHiddenFields = helper.validationNull(fields.hiddenFields);
        const valPaymentTypeRef = helper.validationNull(fields.paymentTypeRef);
        const valNumberOfPeriod = helper.validationNull(fields.numberOfPeriod)
        const valPaysheetProcessDuration = helper.validationNull(fields.numberOfPeriod);
        const valExposureDays = helper.validationNull(fields.numberOfPeriod);
        const valPorcentageAdvanceAccrued = helper.validationNull(fields.numberOfPeriod);
        const valPorcentageAdvanceNoAccrued = helper.validationNull(fields.numberOfPeriod);
        const valCreditLine = helper.validationNull(fields.numberOfPeriod);
        const valDeadlinePay = helper.validationNull(fields.numberOfPeriod);
        const valAddress = helper.validationNull(fields.numberOfPeriod);
        const valBusinessName = helper.validationNull(fields.numberOfPeriod);
        const valCutDate = helper.validationNull(fields.numberOfPeriod);
        const valCutDayOne = helper.validationNull(fields.numberOfPeriod);
        const ValCutDayPost = helper.validationNull(fields.numberOfPeriod);
        const valCutDayRef = helper.validationNull(fields.cutDayRef);

        setValidationError({
            name: valName,
            code: valCode,
            customerRef: valCustomerRef,
            paymentPeriodicityRef: valPaymentPeriodicityRef,
            hiddenFields: valHiddenFields,
            paymentTypeRef: valPaymentTypeRef,
            numberOfPeriod: valNumberOfPeriod,
            paysheetProcessDuration: valPaysheetProcessDuration,
            ExposureDays: valExposureDays,
            porcentageAdvanceAccrued: valPorcentageAdvanceAccrued,
            porcentageAdvanceNoAccrued: valPorcentageAdvanceNoAccrued,
            creditLine: valCreditLine,
            deadlinePay: valDeadlinePay,
            address: valAddress,
            businessName: valBusinessName,
            cutDate: valCutDate,
            cutDayOne: valCutDayOne,
            cutDayPost: ValCutDayPost,
            cutDayRef: valCutDayRef,
        })
        return valName || valCode || valCustomerRef || valPaymentPeriodicityRef ||
            valHiddenFields || valPaymentTypeRef || valNumberOfPeriod || valPaysheetProcessDuration ||
            valExposureDays || valPorcentageAdvanceAccrued || valPorcentageAdvanceNoAccrued || valCreditLine ||
            valDeadlinePay || valAddress || valBusinessName || valCutDate || valCutDayOne || ValCutDayPost || valCutDayRef;
    };

    useEffect(() => {
        if (initialState.id) {
            const valueHiddenFields = confirmations.filter(confir => confir.value === initialState.hiddenFields)[0];
            const newInitialState = { ...initialState, hiddenFields: valueHiddenFields };
            setFields(newInitialState);
        }
    }, [initialState, setFields]);

    return (
        <React.Fragment>
            <SubContainer>
                <Grid container spacing={3} className={Styles.formContainer}>
                    <Wrapper>
                        <label>Empresa:</label>
                    </Wrapper>
                    <Wrapper>
                        <label>Propiedades generales:</label>
                    </Wrapper>
                    <GripWrapper>
                        <TextField
                            label='Nombre de la empresa'
                            variant="outlined"
                            fullWidth
                            error={validationError.name}
                            {...newPropsInputValue('name')}

                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Código de la empresa'
                            variant="outlined"
                            fullWidth
                            error={validationError.code}
                            {...newPropsInputValue('code')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <Autocomplete
                            options={customerTypes}
                            getOptionLabel={option => option.name}
                            size="small"
                            classes={{ listbox: Styles.ListBox }}
                            {...newPropsAutocomplete('customerRef')}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Tipo de cliente"
                                    variant="outlined"
                                    error={validationError.customerRef}
                                />
                            }
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <Autocomplete
                            options={periodicity}
                            getOptionLabel={option => option.name}
                            size="small"
                            classes={{ listbox: Styles.ListBox }}
                            {...newPropsAutocomplete('paymentPeriodicityRef')}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Periodicidad"
                                    variant="outlined"
                                    error={validationError.paymentPeriodicityRef}
                                />
                            }
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <Autocomplete
                            options={confirmations}
                            getOptionLabel={option => option.label}
                            size="small"
                            classes={{ listbox: Styles.ListBox }}
                            {...newPropsAutocomplete('hiddenFields')}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Campos ocultos"
                                    variant="outlined"
                                    error={validationError.hiddenFields}
                                />
                            }
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <Autocomplete
                            options={paymentTypes}
                            getOptionLabel={option => option.name}
                            size="small"
                            classes={{ listbox: Styles.ListBox }}
                            {...newPropsAutocomplete('paymentTypeRef')}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Tipo de pago"
                                    variant="outlined"
                                    error={validationError.paymentTypeRef}
                                />
                            }
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Cantidad de periodos'
                            variant="outlined"
                            fullWidth
                            error={validationError.numberOfPeriod}
                            {...newPropsInputValue('numberOfPeriod')}
                            InputProps={{
                                type: "number",
                            }}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Duración de proceso de nómina(días)'
                            variant="outlined"
                            fullWidth
                            error={validationError.paysheetProcessDuration}
                            {...newPropsInputValue('paysheetProcessDuration')}
                            InputProps={{
                                type: "number",
                            }}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Días de Exposure'
                            variant="outlined"
                            fullWidth
                            error={validationError.ExposureDays}
                            {...newPropsInputValue('ExposureDays')}
                            InputProps={{
                                type: "number",
                            }}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='% adelanto de lo devengado'
                            variant="outlined"
                            error={validationError.porcentageAdvanceAccrued}
                            {...newPropsInputValue('porcentageAdvanceAccrued')}
                            fullWidth
                            InputProps={{
                                type: "number",
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,

                            }}
                        />

                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='% adelanto de lo no devengado'
                            variant="outlined"
                            fullWidth
                            error={validationError.porcentageAdvanceNoAccrued}
                            {...newPropsInputValue('porcentageAdvanceNoAccrued')}
                            InputProps={{
                                type: "number",
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Línea de  '
                            variant="outlined"
                            fullWidth
                            error={validationError.creditLine}
                            placeholder='$'
                            {...newPropsInputValue('creditLine')}
                            InputProps={{
                                type: "number",
                            }}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Fecha límite de pago(texto)"
                            fullWidth
                            error={validationError.deadlinePay}
                            variant="outlined"
                            {...newPropsInputValue('deadlinePay')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Dirección"
                            multiline
                            rowsMax={2}
                            variant="outlined"
                            fullWidth
                            error={validationError.address}
                            {...newPropsInputValue('address')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Razón Social"
                            fullWidth
                            variant="outlined"
                            error={validationError.businessName}
                            {...newPropsInputValue('businessName')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Fecha de corte(texto)"
                            fullWidth
                            variant="outlined"
                            error={validationError.cutDate}
                            {...newPropsInputValue('cutDate')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Días corte uno"
                            fullWidth
                            variant="outlined"
                            error={validationError.cutDayOne}
                            {...newPropsInputValue('cutDayOne')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label="Días corte posterior"
                            fullWidth
                            variant="outlined"
                            error={validationError.cutDayPost}
                            {...newPropsInputValue('cutDayPost')}
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <Autocomplete
                            options={cutDays}
                            getOptionLabel={option => option.name}
                            size="small"
                            classes={{ listbox: Styles.ListBox }}
                            {...newPropsAutocomplete('cutDayRef')}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    label="Días corte"
                                    variant="outlined"
                                    error={validationError.cutDayRef}
                                />
                            }
                        />
                    </GripWrapper>
                    <GripWrapper>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="dispersion"
                                    color="primary"
                                    {...newPropsCheck('isDispersion')}
                                />
                            }
                            label="Dispersión"
                        />
                    </GripWrapper>
                    <Wrapper>
                        <label>Correos de notificación:</label>
                    </Wrapper>
                    <Wrapper>
                        <ChipMailList addEmailNotification={addEmailNotification} emailNotifications={initialState.emailNotification}></ChipMailList>
                    </Wrapper>
                    <GripWrapper>
                        <FormControlLabel control={
                            <Checkbox  {...newPropsCheck('officialIdentification')}
                                color='primary'
                            />}
                            label="Identificación oficial" />
                    </GripWrapper>
                    <GripWrapper>
                        <FormControlLabel control={
                            <Checkbox  {...newPropsCheck('digitalSignature')}
                                color='primary'
                            />}
                            label="Firma autógrafa digital" />
                    </GripWrapper>
                    <GripWrapper>
                        <FormControlLabel control={
                            <Checkbox  {...newPropsCheck('CURP')}
                                color='primary'
                            />}
                            label="CURP" />
                    </GripWrapper>
                    <GripWrapper>
                        <FormControlLabel control={
                            <Checkbox  {...newPropsCheck('proofAddress')}
                                color='primary'
                            />}
                            label="Comprobante de domicilio" />
                    </GripWrapper>
                    <GripWrapper>
                        <FormControlLabel control={
                            <Checkbox
                                {...newPropsCheck('CLABE')}
                                color='primary'
                            />}
                            label="CLABE" />
                    </GripWrapper>

                    <Wrapper>
                        <TableExtraFields addExtraFields={addExtraFields} extraFields={initialState.extraField}></TableExtraFields>


                    </Wrapper>
                    <Wrapper>
                        <Buttom
                            variant='contained'
                            color='primary'
                            onClick={handleAddCompany}
                        >
                            Guardar
                            </Buttom>

                    </Wrapper>

                </Grid>
            </SubContainer>
        </React.Fragment>
    );
};

export default CompaniesAddEditFormMx;