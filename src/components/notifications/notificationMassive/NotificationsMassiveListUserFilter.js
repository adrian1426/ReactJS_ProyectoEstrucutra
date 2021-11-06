import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Checkbox from '@material-ui/core/Checkbox';
import { userStatus } from '../../../constants/catalogs';
import Styles from './NotificationsMassiveListUser.module.css';
import NotificationsMassiveListUserFilterActions from './NotificationsMassiveListUserFilterActions';

const NotificationsMassiveListUserFilter = props => {
  const { companies } = props;
  const [name, setName] = useState('');
  const [companiesFilter, setCompaniesFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [selectedDate, setSelectedDate] = useState([null, null]);

  const onChangeName = e => {
    setName(e.target.value);
  };
  return (
    <div className={Styles.Filters}>
      <div className={Styles.Filters_Input}>
        <TextField
          label='Nombre..'
          variant='outlined'
          className={Styles.Filters_Input_Element}
          value={name}
          onChange={onChangeName}
        />

        <Autocomplete
          multiple
          options={companies}
          disableCloseOnSelect
          getOptionLabel={(option) => option.businessName}
          className={Styles.Filters_Input_MulElement}
          onChange={(e, data) => {
            setCompaniesFilter(data);
          }}
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

        <Autocomplete
          multiple
          options={userStatus}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          className={Styles.Filters_Input_MulElement}
          onChange={(e, data) => {
            setStatusFilter(data);
          }}
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
              label='Seleccione estatus...'
              variant="outlined"
              placeholder='Seleccione estatus...'
            />
          )}
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
                  className={Styles.SpaceDate}
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
      </div >



      <div className={Styles.Filters_Actions}>
        <NotificationsMassiveListUserFilterActions />
      </div>
    </div>
  );
};

export default NotificationsMassiveListUserFilter;