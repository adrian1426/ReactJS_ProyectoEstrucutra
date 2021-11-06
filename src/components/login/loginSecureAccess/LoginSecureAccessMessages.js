import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { initialStateMessage } from '../loginSecureAccess/initialStateMessage';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const LoginSecureAccessMessages = props => {
  const { messageAlert: { open, type, message, isLogout }, setOpenMessage, logout } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    if (isLogout) {
      logout();
    }

    setOpenMessage(initialStateMessage);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

LoginSecureAccessMessages.propTypes = {
  messageAlert: PropTypes.object.isRequired,
  setOpenMessage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginSecureAccessMessages;