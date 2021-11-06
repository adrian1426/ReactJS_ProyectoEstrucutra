import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import esLocale from 'date-fns/locale/es';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { DateRangePicker, LocalizationProvider } from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Styles from './Visa.module.css';

const VisaFilters = props => {

  //declaraciones
  const { statusCredits, companies, filterData, clearFilter } = props
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [amountFrom, setAmountFrom] = useState('');
  const [amountUpTo, setAmountUpTo] = useState('');
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState(null);
  const [creditType, setCreditType] = useState(null);

  const tiposCreditos = [
    { id: '1', name: 'Credito a plazo' },
    { id: '2', name: 'Adelanto de Ingresos' }
  ];

  //funciones
  const handlerFilter = () => {
    const dataFilter = {
      name: clientName,
      dateStart: new Date(selectedDate[0]).toLocaleDateString('en-US'),
      dateEnd: new Date(selectedDate[1]).toLocaleDateString('en-US'),
      companyRef: 'companies/' + company.id,
      creditType: creditType.id,
      mountStart: amountFrom,
      mountEnd: amountUpTo
    };
    filterData(dataFilter);
  }
  const handlerClearFilter = () => {
    setClientName('');
    setAmountFrom('');
    setAmountUpTo('');
    setCompany(null);
    setCreditType(null);
    setSelectedDate([null, null]);
    clearFilter();
  }
  const evalControls = () => {
    return (clientName.length > 0 || amountFrom.length > 0 || amountUpTo.length > 0 || selectedDate.length > 0 || company.length > 0)
  }
  //binding de datos
  const onChangeName = (event) => {
    setClientName(event.target.value);
  }
  const onChangeMountFrom = (event) => {
    setAmountFrom(event.target.value);
  }
  const onChangeAmountUpTo = (event) => {
    setAmountUpTo(event.target.value);
  }

  //template
  return (
    <div className={Styles.Filters}>
      <Grid container spacing={1}>
        {/* Fila 1 */}
        {/* Fecha desde... hasta... */}
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
            <DateRangePicker
              startText='Desde...'
              endText='Hasta...'
              value={selectedDate}
              onChange={date => { setSelectedDate(date) }}
              calendars={1}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className={Styles.FormControl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <DateRangeIcon />
                            </InputAdornment>
                          )
                        }}
                        {...{ ...startProps, helperText: '' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        className={Styles.FormControl}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <DateRangeIcon />
                            </InputAdornment>
                          )
                        }}
                        {...{ ...endProps, helperText: '' }}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
            />
          </LocalizationProvider>

        </Grid>
        {/* montos desde... hasta... */}
        <Grid item xs={12} md={3}>
          <TextField
            className={Styles.FormControl}
            label='Monto desde...'
            onChange={onChangeMountFrom}
            value={amountFrom}
            variant='outlined'
            placeholder='0.0'
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            className={Styles.FormControl}
            label='Monto hasta...'
            onChange={onChangeAmountUpTo}
            value={amountUpTo}
            variant='outlined'
            placeholder='0.0'
          />
        </Grid>
        {/* Fila 2 */}
        {/* Combo tipos de creditos */}
        <Grid item xs={12} md={4}>
          <Autocomplete
            value={creditType}
            options={tiposCreditos}
            onChange={(e, data) => {
              setCreditType(data);
            }}
            className={Styles.Filters_Input_Element}
            getOptionLabel={(options) => options.name}
            renderInput={(params) => <TextField {...params} label='Tipo de credito...' variant='outlined' />}
          />
        </Grid>
        {/* Combo de empresas */}
        <Grid item xs={12} md={4}>
          <Autocomplete
            value={company}
            options={companies}
            onChange={(e, data) => {
              setCompany(data);
            }}
            className={Styles.Filters_Input_Element}
            getOptionLabel={(options) => options.businessName}
            renderInput={(params) => <TextField {...params} label='Empresa...' variant='outlined' />}
          />
        </Grid>
        {/* Campo nombre de texto */}
        <Grid item xs={12} md={4}>
          <TextField
            className={Styles.FormControl}
            label='Nombre...'
            onChange={onChangeName}
            value={clientName}
            variant='outlined'
            placeholder='Nombre...'
          />
        </Grid>
        <Grid container alignItems='flex-end' justify='flex-end' spacing={1} item xs={12}>
          <Grid item xs={12} md={2}>
            <Button variant='outlined' className={Styles.FormControl} color='primary' onClick={handlerClearFilter}>Limpiar filtros</Button>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button variant='contained' className={Styles.FormControl} color='primary' onClick={handlerFilter}>Filtrar</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default VisaFilters;