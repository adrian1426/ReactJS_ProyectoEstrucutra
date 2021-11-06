import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import SubContainer from '../../common/Container/SubContainer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Styles from './Companies.module.css';
import ChipMailList from './ChipMailList';
import Buttom from '@material-ui/core/Button';
import useForm from '../../../hooks/useForm';
import { confirmations, customerTypes, paymentTypes, cutDays, periodicity } from '../../../constants/catalogs';
import GripWrapper from '../../common/gridWrapper/GridWrapper';
import Grid from '@material-ui/core/Grid';

const Wrapper = (props) => {
    return (
        <Grid item lg={12} md={12} xs={12}>
            {props.children}
        </Grid>
    );

}
const CompaniesAddEditFormCo = (props) => {
    const { initialState, addCompany } = props;
    const { newPropsInputValue, newPropsAutocomplete, fields, setFields } = useForm(initialState);
    const [emailNotifications, setEmailNotifications] = useState(initialState.emailNotification);

    const addEmailNotification = (emails) => {
        setEmailNotifications([...emailNotifications, emails])
    }

    const handleAddCompany = () => {
        addCompany(fields, emailNotifications)
    };
    useEffect(() => {
        if (initialState.id) {
            const valueHiddenFields = confirmations.filter(confir => confir.value === initialState.hiddenFields)[0];
            console.log(initialState)
            const newInitialState = { ...initialState, hiddenFields: valueHiddenFields };
            setFields(newInitialState);
        }
    }, [initialState, setFields]);


    return (
        <React.Fragment>
            <SubContainer>
                <Grid container spacing={3} className={Styles.formContainer}>
                    <Wrapper>
                        <label><b>{initialState.name}</b></label>
                    </Wrapper>
                    <Wrapper>
                        <label>Propiedades generales:</label>
                    </Wrapper>
                    <GripWrapper>
                        <TextField
                            label='Nombre de la empresa'
                            variant="outlined"
                            fullWidth
                            {...newPropsInputValue('name')}

                        />
                    </GripWrapper>
                    <GripWrapper>
                        <TextField
                            label='Código de la empresa'
                            variant="outlined"
                            fullWidth
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
                                />
                            }
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
                                />
                            }
                        />
                    </GripWrapper>

                    <Wrapper>
                        <label>Correos de notificación:</label>
                    </Wrapper>
                    <Wrapper>
                        <ChipMailList addEmailNotification={addEmailNotification} emailNotifications={initialState.emailNotification}></ChipMailList>
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

export default CompaniesAddEditFormCo;