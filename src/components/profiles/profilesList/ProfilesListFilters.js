import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Styles from './ProfilesList.module.css';
import { confirmations, menuAccess } from '../../../constants/catalogs';

const initialFilter = {
  status: null,
  rol: null,
  access: null,
  dateStart: null,
  dateEnd: null
};

const ProfilesListFilters = (props) => {
  const { handleFilterProfiles } = props;
  const [status, setStatus] = useState(null);
  const [rol, setRol] = useState(null);
  const [access, setAccess] = useState(null);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [filterDisabled, setFilterDisabled] = useState(true);

  const handleFilter = () => {
    const objFilter = {
      status: status?.value,
      rol: rol?.value,
      access: access?.name,
      dateStart: selectedDate[0] && new Date(selectedDate[0]).getTime(),
      dateEnd: selectedDate[1] && new Date(selectedDate[1]).getTime()
    };

    handleFilterProfiles(objFilter);
  };

  const handleCleanFilter = () => {
    setStatus(null);
    setRol(null);
    setAccess(null);
    setSelectedDate([null, null]);
    handleFilterProfiles(initialFilter);

  };

  useEffect(() => {
    if (status || rol || access || selectedDate[0] || selectedDate[1]) {
      setFilterDisabled(false);
    } else {
      if (!filterDisabled) {
        setFilterDisabled(true);
        handleFilterProfiles(initialFilter);
      }
    }
  }, [status, rol, access, selectedDate, filterDisabled, handleFilterProfiles]);

  return (
    <div className={Styles.Filter}>

      <div className={Styles.Filter_Input}>
        <Autocomplete
          className={Styles.Autocomplete}
          options={confirmations}
          getOptionLabel={option => option.labelActive}
          value={status}
          size="small"
          onChange={(e, data) => {
            setStatus(data);
          }}
          renderInput={params =>
            <TextField
              {...params}
              label="Seleccione status..."
              variant="outlined"
            />
          }
        />

        <Autocomplete
          className={Styles.Autocomplete}
          options={confirmations}
          getOptionLabel={option => option.labelRol}
          value={rol}
          size="small"
          onChange={(e, data) => {
            setRol(data);
          }}
          renderInput={params =>
            <TextField
              {...params}
              label="Seleccione rol..."
              variant="outlined"
            />
          }
        />

        <Autocomplete
          className={Styles.Autocomplete}
          options={menuAccess}
          getOptionLabel={option => option.name}
          value={access}
          size="small"
          onChange={(e, data) => {
            setAccess(data);
          }}
          renderInput={params =>
            <TextField
              {...params}
              label="Seleccione accesos..."
              variant="outlined"
            />
          }
        />

        <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
          <DateRangePicker
            startText="Registro desde..."
            endText="Registro hasta..."
            value={selectedDate}
            onChange={date => setSelectedDate(date)}
            calendars={1}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  className={Styles.DateTextField}
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
                  className={Styles.DateTextField}
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
      </div>

      <div className={Styles.Filter_Actions}>
        <Button
          className={Styles.Filter_Actions_Buttom}
          color="primary"
          variant="outlined"
          onClick={handleCleanFilter}
          disabled={filterDisabled}
        >
          Limpiar Filtros
        </Button>

        <Button
          className={Styles.Filter_Actions_Buttom}
          color="primary"
          variant="contained"
          disabled={filterDisabled}
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </div>

    </div>
  );
};

ProfilesListFilters.propTypes = {
  handleFilterProfiles: PropTypes.func.isRequired
};

export default ProfilesListFilters;