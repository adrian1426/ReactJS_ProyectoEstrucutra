import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Checkbox from '@material-ui/core/Checkbox';
import EmployeesListFilterActions from './EmployeesListFilterActions';
import { refsCompany, refsUserStatus } from '../../../constants/refsCollection';
import { useTranslation } from 'react-i18next';
import Styles from './EmployeesListFilter.module.css';

const EmployeesListFilter = (props, ref) => {
  const { companies, nameEmployees, getEmployeesName, pageSizeTable, getEmployees,
    addFilterTable, setIsFiltered, userStatus
  } = props;
  const [name, setName] = useState(null);
  const [companiesFilter, setCompaniesFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [filterDisabled, setFilterDisabled] = useState(true);
  const { t } = useTranslation('employeesList');

  const onChangeName = e => {
    getEmployeesName(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    cleanFilter: () => cleanFilter()
  }));

  const cleanFilter = () => {
    setName(null);
    setCompaniesFilter([]);
    setStatusFilter(null);
    setSelectedDate([null, null]);
    setFilterDisabled(true);
  };
  const cleanFilterGetEmployees = () => {
    getEmployees(pageSizeTable);
  };

  const applyFilter = () => {
    const newCopanies = companiesFilter.map(item => {
      return {
        companyRef: `${refsCompany}/${item.id}`
      };
    });

    const nameEmployee = name && { name: name };
    const companyEmployee = companiesFilter[0] && { companies: newCopanies };
    const statusEmployee = statusFilter && { employeeStatusRef: `${refsUserStatus}/${statusFilter.id}` };
    const dateStartEmployee = selectedDate[0] && { dateStart: new Date(selectedDate[0]).toLocaleDateString('en-US') };
    const dateEndEmployee = selectedDate[1] && { dateEnd: new Date(selectedDate[1]).toLocaleDateString('en-US') };

    const dataFilter = {
      filters: {
        ...nameEmployee,
        ...companyEmployee,
        ...statusEmployee,
        ...dateStartEmployee,
        ...dateEndEmployee
      }
    };

    setIsFiltered(false);
    addFilterTable(dataFilter);
  };

  useEffect(() => {
    if (name || companiesFilter[0] || statusFilter || selectedDate[0] || selectedDate[1]) {
      setFilterDisabled(false);
    } else {
      if (!filterDisabled) {
        setFilterDisabled(true);
        getEmployees(pageSizeTable);
      }
    }
  }, [name, companiesFilter, statusFilter, selectedDate, filterDisabled, getEmployees, pageSizeTable]);

  return (
    <div className={Styles.Filters}>
      <div className={Styles.Filters_Input}>
        <Autocomplete
          freeSolo
          options={nameEmployees.map((option) => option.name)}
          className={Styles.Filters_Input_MulElement}
          onChange={(e, data) => {
            setName(data);
          }}
          value={name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={t('filters.name')}
              variant="outlined"
              onChange={onChangeName}
            />
          )}
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
          value={companiesFilter}
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
              label={t('filters.company')}
              variant="outlined"
              placeholder={t('filters.company')}
            />
          )}
        />

        <Autocomplete
          options={userStatus}
          getOptionLabel={option => option.name}
          className={Styles.Filters_Input_Element}
          size="small"
          onChange={(e, data) => {
            setStatusFilter(data);
          }}
          value={statusFilter}
          renderInput={params =>
            <TextField
              {...params}
              label={t('filters.status')}
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
        <EmployeesListFilterActions
          filterDisabled={filterDisabled}
          cleanFilter={cleanFilterGetEmployees}
          applyFilter={applyFilter}
        />
      </div>
    </div>
  );
};

export default forwardRef(EmployeesListFilter);