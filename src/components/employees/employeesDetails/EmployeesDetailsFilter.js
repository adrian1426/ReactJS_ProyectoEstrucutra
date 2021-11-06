import React, { useState, useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Buttom from '@material-ui/core/Button';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Grid from '@material-ui/core/Grid';
import Styles from './EmployeesDetails.module.css'

const EmployeesDetailsFilter = (props) => {
    const [status, setStatus] = useState(null);
    const [selectedDate, setSelectedDate] = useState([null, null]);
    const [filterDisabled, setFilterDisabled] = useState(true);

    const handleFilter = () => {
        const objFilter = {
            status: status?.value,
            dateStart: selectedDate[0] && new Date(selectedDate[0]).toLocaleDateString(),
            dateEnd: selectedDate[1] && new Date(selectedDate[1]).toLocaleDateString()
        };
    };

    const handleCleanFilter = () => {
        setSelectedDate([null, null]);
    }

    useEffect(() => {
        if (status || selectedDate[0] || selectedDate[1]) {
            setFilterDisabled(false);
        } else {
            setFilterDisabled(true);
        }
    }, [selectedDate]);

    return (
        <Grid container spacing={2} className={Styles.formContainer}>
            <Grid item lg={4} md={8} xs={12}>
                <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
                    <DateRangePicker
                        fullWidth
                        startText="Registro desde..."
                        endText="Registro hasta..."
                        value={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        calendars={1}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField
                                    fullWidth
                                    className={Styles.dateTextField}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    {...{ ...startProps, helperText: '' }}
                                />

                                <TextField
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <DateRangeIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...{ ...endProps, helperText: '' }}
                                />

                            </React.Fragment>
                        )}
                    />

                </LocalizationProvider>
            </Grid>

            <Grid item lg={2} md={4} xs={4}>
                <Buttom
                    color="primary"
                    variant="outlined"
                    fullWidth
                    onClick={handleCleanFilter}
                    disabled={filterDisabled}
                >
                    Limpiar Filtros
                </Buttom>
            </Grid >
            <Grid item lg={2} md={4} xs={4}>
                <Buttom
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={handleFilter}
                    disabled={filterDisabled}
                >
                    Filtrar
            </Buttom>
            </Grid>
        </Grid>
    );
};

export default EmployeesDetailsFilter;