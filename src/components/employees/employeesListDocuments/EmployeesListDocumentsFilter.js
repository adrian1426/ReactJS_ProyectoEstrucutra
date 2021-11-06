import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Checkbox from '@material-ui/core/Checkbox';
import Styles from './EmployeeListDocuments.module.css';

import { Button } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';


const EmployeesListDocumentsFilter = props => {

  const { companies, documents, placeholderDocuments, filterData, cleanFilter, loadingData } = props;
  const [companyFilter, setCompanyFilter] = useState([]);
  const [documentFilter, setDocumentFilter] = useState([]);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [name, setName] = useState('');
  const [blockButtonsFilter, setBlockButtonsFilter] = useState(true);
  //Funciones
  const onChangeName = e => {
    setName(e.target.value);
    setBlockButtonsFilter(!evalControls());
  };
  const evalControls = () => {
    return (name.length > 0 || companyFilter.length > 0 || documentFilter > 0 || selectedDate.length > 0);
  }

  const filter = () => {
    const dataFilter = {
      name: name,
      documents: documentFilter,
      dateStart: selectedDate[0] ? new Date(selectedDate[0]).toLocaleDateString('en-US'):'',
      dateEnd: selectedDate[1] ? new Date(selectedDate[1]).toLocaleDateString('en-US'):'',
      companyRef: companyFilter.length > 0 ? 'companies/'+companyFilter[0].id:''
    };
    const rm = removeEmptyData(dataFilter);
    filterData(rm);
  };

  const clearFilter = () => {
    setCompanyFilter([]);
    setSelectedDate([null, null]);
    setName('');
    setDocumentFilter([]);
    setBlockButtonsFilter(true);
    cleanFilter({});
  };

  const removeEmptyData = (dataFilter) => {
    for (let clave in dataFilter){
      if(dataFilter[clave] === null || dataFilter[clave] === '' || dataFilter[clave] === undefined){
        delete dataFilter[clave];
      }
    }
    return dataFilter;
  };

  //template
  return (
    <div className={Styles.Filters}>
      <Grid container spacing={1}>
        <Grid item className={Styles.Grid}>
          <TextField
            label='Nombre..'
            variant='outlined'
            className={Styles.Input_Filter_Text}
            disabled={loadingData}
            value={name}
            onChange={onChangeName}
          />
        </Grid>
        <Grid item className={Styles.Grid}>
          <Autocomplete
            multiple
            options={companies}
            disableCloseOnSelect
            disabled={loadingData}
            getOptionLabel={(option) => option.businessName}
            className={Styles.Filters_Input_MulElement}
            onChange={(e, data) => {
              setCompanyFilter(data)
              setBlockButtonsFilter(!evalControls());
            }}
            value={companyFilter}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  color='primary'
                  checked={selected}
                />
                {option.businessName}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Seleccione empresa...'
                variant="outlined"
                placeholder='Seleccione empresa...'
              />
            )}
          />
        </Grid>
        <Grid item className={Styles.Grid}>
          <Autocomplete
            multiple
            options={documents}
            disableCloseOnSelect
            disabled={loadingData}
            getOptionLabel={(option) => option.name}
            className={Styles.Filters_Input_MulElement}
            onChange={(e, data) => {
              setDocumentFilter(data);
              setBlockButtonsFilter(!evalControls());
            }}
            value={documentFilter}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                <Checkbox
                  color='primary'
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={placeholderDocuments}
                variant="outlined"
                placeholder={placeholderDocuments}
              />
            )}
          />
        </Grid>
        <Grid item className={Styles.Grid_Date_Range}>
          <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
            <DateRangePicker
              disabled={loadingData}
              startText="Registro desde..."
              endText="Registro hasta..."
              value={selectedDate}
              onChange={date => {setSelectedDate(date); setBlockButtonsFilter(!evalControls());}}
              calendars={1}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField
                    className={Styles.SpaceDate}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <DateRangeIcon />
                        </InputAdornment>
                      )
                    }}
                    {...{ ...startProps, helperText: '' }}
                  />
                  <TextField
                    className={Styles.SpaceDate}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
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
      </Grid>
      {/* Botones de accion(Limpiar filtros, Filtrar) */}
      <div>
        <Button
          className={Styles.Actions}
          color='primary'
          variant='contained'
          onClick={filter}
          disabled={blockButtonsFilter || loadingData}
        >
          Filtrar
          </Button>
        <Button
          className={Styles.Actions}
          color='primary'
          variant='outlined'
          onClick={clearFilter}
          disabled={blockButtonsFilter || loadingData}
        >
          Limpiar Filtros
          </Button>
      </div>
    </div>
  );
};

export default EmployeesListDocumentsFilter;