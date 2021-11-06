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
import { confirmations } from '../../../constants/catalogs';
import { useTranslation } from 'react-i18next';
import Styles from './UsersListFilter.module.css';

const initialFilter = {
  status: null,
  profileId: null,
  dateStart: null,
  dateEnd: null
};

const UsersListFilter = (props) => {
  const { profiles, handleFilterUsers } = props;
  const [status, setStatus] = useState(null);
  const [profile, setProfile] = useState(null);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [filterDisabled, setFilterDisabled] = useState(true);
  const { t } = useTranslation('users');

  const handleFilter = () => {
    const objFilter = {
      status: status?.value,
      profileId: profile?.id,
      dateStart: selectedDate[0] && new Date(selectedDate[0]).getTime(),
      dateEnd: selectedDate[1] && new Date(selectedDate[1]).getTime()
    };

    handleFilterUsers(objFilter);
  };

  const handleCleanFilter = () => {
    setStatus(null);
    setProfile(null);
    setSelectedDate([null, null]);
    handleFilterUsers(initialFilter);
  };

  useEffect(() => {
    if (status || profile || selectedDate[0] || selectedDate[1]) {
      setFilterDisabled(false);
    } else {
      if (!filterDisabled) {
        setFilterDisabled(true);
        handleFilterUsers(initialFilter);
      }
    }
  }, [status, profile, selectedDate, filterDisabled, handleFilterUsers]);

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
              label={t('filters.status')}
              variant="outlined"
            />
          }
        />

        <Autocomplete
          className={Styles.Autocomplete}
          options={profiles}
          getOptionLabel={option => option.name}
          value={profile}
          size="small"
          onChange={(e, data) => {
            setProfile(data);
          }}
          renderInput={params =>
            <TextField
              {...params}
              label={t('filters.rol')}
              variant="outlined"
            />
          }
        />

        <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
          <DateRangePicker
            startText={t('filters.dateStart')}
            endText={t('filters.dateEnd')}
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
          {t('filters.actionClean')}
        </Button>

        <Button
          className={Styles.Filter_Actions_Buttom}
          color="primary"
          variant="contained"
          disabled={filterDisabled}
          onClick={handleFilter}
        >
          {t('filters.actionFilter')}
        </Button>
      </div>
    </div>
  );
};

UsersListFilter.propTypes = {
  profiles: PropTypes.array.isRequired,
  handleFilterUsers: PropTypes.func.isRequired
};

export default UsersListFilter;