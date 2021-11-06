import React, { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import esLocale from 'date-fns/locale/es';
import { DateRangePicker, LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button';
import Styles from './NotificationsList.module.css';
import { useTranslation } from 'react-i18next';

// import NotificationsMassiveListUserFilterActions from './NotificationsMassiveListUserFilterActions';
const styles = {
  width: '180px',
  marginLeft: '10px'
};


const NotificationsListFilter = (props) => {

  
  const { addFilterTable,setIsFiltered,getNotifications,pageSizeTable,statusNotification } = props;
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [selectedSendDate, setSelectedSendDate] = useState([null, null]);
  const [selectedCancelDate, setSelectedCancelDate] = useState([null, null]);
  const [filterDisabled, setFilterDisabled] = useState(true);
  const { t } = useTranslation('notificationsList');

  

  const onChangeName = e => {
    setName(e.target.value);    
  };
  const cleanFilter=()=>{
    setName('');
    setSelectedDate([null,null]);
    setSelectedSendDate([null,null]);
    setSelectedCancelDate([null,null]);
   

  }

  const convertDate = (usDate)=> {
    var dateParts = usDate.split(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    return dateParts[3] + "-" + dateParts[1] + "-" + dateParts[2]+" "+"00:00";
  }

  const applyFilter = () => {
    // const newCopanies = companiesFilter.map(item => {
    //   return {
    //     companyRef: `${refsCompany}/${item.id}`
    //   };
    // });

    const nameUser = name && { idUserSender: name };
    const dateStartNotification = selectedDate[0] && { createdAtStart: convertDate(new Date(selectedDate[0]).toLocaleDateString('en-US')) };
    const dateEndNotification = selectedDate[1] && { createdAtEnd: convertDate(new Date(selectedDate[1]).toLocaleDateString('en-US')) };
    const dateSendStartNotification = selectedSendDate[0] && { sentAtStart: convertDate(new Date(selectedSendDate[0]).toLocaleDateString('en-US')) };
    const dateSendEndNotification = selectedSendDate[1] && { sentAtEnd: convertDate(new Date(selectedSendDate[1]).toLocaleDateString('en-US')) };
    const dateCancelStartNotification = selectedCancelDate[0] && { canceledAtStart: convertDate(new Date(selectedCancelDate[0]).toLocaleDateString('en-US')) };
    const dateCancelEndNotification = selectedCancelDate[1] && { canceledAtEnd: convertDate(new Date(selectedCancelDate[1]).toLocaleDateString('en-US')) };
   


    const dataFilter = {
      filters: {
        ...nameUser,       
        ...dateStartNotification,
        ...dateEndNotification,
        ...dateSendStartNotification,
        ...dateSendEndNotification,
        ...dateCancelStartNotification,
        ...dateCancelEndNotification
      }
    };

    setIsFiltered(false);
    addFilterTable(dataFilter);
  };

  useEffect(() => {
    if (name || selectedDate[0] ||  selectedDate[1] || selectedSendDate[0] ||  selectedSendDate[1] || selectedCancelDate[0] ||  selectedCancelDate[1] ) {
      setFilterDisabled(false);
    } else {
      if (!filterDisabled) {
        setFilterDisabled(true);
        getNotifications(pageSizeTable);
      }
    }
  }, [name,selectedDate,selectedSendDate,selectedCancelDate, filterDisabled, getNotifications, pageSizeTable]);


  return (
    <div className={Styles.Filters}>
      <div className={Styles.Filters_Input}>
        <TextField
          label={t('filters.user')}
          variant='outlined'
          className={Styles.Filters_Input_Element}
          value={name}
          onChange={onChangeName}
        />    

        <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
          <DateRangePicker
          
            startText={t('filters.createdAtStart')}
            endText={t('filters.createdAtEnd')}
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
          <DateRangePicker
            startText={t('filters.sendAtStart')}
            endText={t('filters.sendAtEnd')}
            value={selectedSendDate}
            onChange={date => setSelectedSendDate(date)}
            calendars={1}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  className={Styles.SpaceDate2}
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

        <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
        { statusNotification === 'canceled' ? <DateRangePicker
            startText={t('filters.canceledAtStart')}
            endText={t('filters.canceledAtEnd')}
            value={selectedCancelDate}
            onChange={date => setSelectedCancelDate(date)}
            calendars={1}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField
                  className={Styles.SpaceDate2}
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
          /> : null }


        </LocalizationProvider>
      </div >

      <div className={Styles.Filters_Actions}>
      <Button
        color="primary"
        variant="outlined"
        style={styles}
        onClick={cleanFilter}
        disabled={filterDisabled}
      >
        {t('filters.actionApply')}
        </Button>

      <Button 
        color="primary"
        variant="contained"
        style={styles}
        onClick={applyFilter}
        disabled={filterDisabled}
        
      >
       {t('filters.actionClean')}
        </Button>
      </div>



     
    </div>
 
  );
};

export default NotificationsListFilter;