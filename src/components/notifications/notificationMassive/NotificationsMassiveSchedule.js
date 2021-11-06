import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import esLocale from 'date-fns/locale/es';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { DatePicker, TimePicker, LocalizationProvider } from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const Wrapper = (props) => {
  return (
    <Grid item lg={12} md={12} xs={12}>
      {props.children}
    </Grid>
  );

}

const useStyles = makeStyles(theme => ({
  root: {

    flexGrow: 1,
    padding: '22px'
  },
  textarea: {
    resize: "both",
    padding: theme.spacing(2)

  },
  btn: {
    margintop: '10px',
    display: 'flex',
    justifycontent: 'flex-end'
  },
  chkbox: {
    height: '39px',
    width: 'calc(20% - 5px) !important',
    marginright: '5px !important'
  },
  formContainer: {
    paddingleft: '20px',
    paddingright: '20px',
    paddingtop: '20px'
  },
  SpaceDate: {
    padding: theme.spacing(2)
  },
  Filters_Input_Element: {
    width: 'calc(25% - 5px) !important',
    marginright: '5px !important'
  },
  Filters_Input: {
    display: 'flex',
    flexgrow: 1
  }

}));






const NotificationsMassiveSchedule = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const classes = useStyles();



  return (
    <div className={classes.root}>
      <Grid container spacing={1} xs>
        <Grid item>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            fullWidth
            label="Programar notificación" labelPlacement="end"
          />
        </Grid>

        <LocalizationProvider dateAdapter={DateFnsUtils} locale={esLocale}>
          <Grid item xs> 
            <DatePicker
                openPickerIcon={<InputAdornment position="end">
                <DateRangeIcon />
              </InputAdornment>}
              onChange={date => setSelectedDate(date)}
              renderInput={(params) =>
                <TextField
                  {...{ ...params, helperText: '' }}
                  variant="outlined" fullWidth />}
              label="Fecha de envío"
              value={selectedDate}

            />
          </Grid>

          <Grid item xs>
            <TimePicker
              value={selectedTime}

              minutesStep={5}
              onChange={time => setSelectedTime(time)}
              renderInput={(props) => <TextField {...{ ...props, helperText: '' }} fullWidth
                variant="outlined" />}
            />
          </Grid>


          <Grid item xs >
            <TextField
              fullWidth
              label="Mensaje a enviar..."
              multiline
              variant="outlined"
              inputProps={{ className: classes.textarea }}

            />
          </Grid>


        </LocalizationProvider>
        <Grid item xs>
          <Button
          className={classes.btn}
            color="primary"
            variant="contained"
            
          >
            Enviar notificación
        </Button>
        </Grid>




      </Grid>
    </div>


  );
};

export default NotificationsMassiveSchedule;