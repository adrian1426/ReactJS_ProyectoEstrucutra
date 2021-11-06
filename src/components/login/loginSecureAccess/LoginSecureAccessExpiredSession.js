import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBarLogo from '../../common/menuBar/MenuBarLogo';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import iconExpiredTime from '../../../assets/images/expiredTime.svg';
import { useAuth0 } from '@auth0/auth0-react';
import Styles from './LoginSecureAccessExpiredSession.module.css';

const LoginSecureAccessExpiredSession = () => {
  const { logout } = useAuth0();

  return (
    <React.Fragment>
      <div className={Styles.grow}>
        <AppBar position="fixed" color="inherit">
          <Toolbar>
            <MenuBarLogo />

            <div className={Styles.grow} />

            <div className={Styles.partLogout}>
              <Tooltip
                title='Su sesión ha expirado por tiempo de inactividad en el sistema, deberá iniciar sesión nuevamente.'
              >
                <span>
                  <IconButton className={Styles.buttonIcon}>
                    <HelpIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Button
                variant='contained'
                startIcon={<ExitToAppIcon />}
                onClick={logout}
              >
                Iniciar Sesión
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <div className={Styles.home}>
        <Typography className={Styles.home__title}>
          Tu sesión ha expirado
        </Typography>

        <Button
          variant='contained'
          color='primary'
          className={Styles.home__btn}
          onClick={logout}
        >
          Iniciar Sesión
        </Button>

        <img
          src={iconExpiredTime}
          alt='sesion expired'
        />
      </div>
    </React.Fragment>
  );
};

export default LoginSecureAccessExpiredSession;