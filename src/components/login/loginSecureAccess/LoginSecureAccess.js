import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LoginSelectCountryContainer from '../loginSelectCountry/LoginSelectCountryContainer';
import Home from '../../home/Home';
import LoaderBackdrop from '../../common/loader/LoaderBackdrop';
import LoginSecureAccessExpiredSession from './LoginSecureAccessExpiredSession';
import UserContext from '../../../context/UserContext';
import { agregarUsuarioAction } from '../../../context/actions/usuarios/usuariosAction';
import { initialStateUser } from '../../../context/initialState/usuario';
import theme from '../../../theme';
import LoginServices from '../../../services/LoginServices';
import { nameCountryLocal } from '../../../constants/storage';

const LoginSecureAccess = props => {
  const { user, setOpenMessage, logout } = props;
  const { state: userState, dispatch } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const countryCode = user['https://example.com/countryCode'] || localStorage.getItem(nameCountryLocal);
  const isExistCountry = countryCode !== undefined && countryCode !== '' && countryCode !== null;
  const ejectLogout = isExistCountry ? true : false;

  const errorLoginAction = useCallback((type, message) => {
    setOpenMessage({ open: true, type, message, isLogout: ejectLogout });
    setLoginSuccess(false);
  }, [ejectLogout, setOpenMessage]);

  const evaluationResponseLogin = useCallback((status, country, response) => {
    switch (status) {
      case 200:
        setLoginSuccess(true);
        setIsLoading(false);
        localStorage.setItem(nameCountryLocal, country);

        const dataUser = response.data;
        const profileTypeAdmin = response.data.roleRefs.filter(iProfile => iProfile.isAdmin);
        const newDataProfie = profileTypeAdmin.map(item => {
          return {
            idProfile: item.id,
            profile: item.name,
            isReadOnly: item.isReadOnly,
          }
        });

        dispatch(agregarUsuarioAction({
          id: dataUser.id,
          name: user.name,
          email: user.email,
          picture: user.picture,
          ...newDataProfie[0],
          codeCountry: countryCode,
          codeLanguaje: 'es_mx',
          companyId: dataUser.companyRef?.id,
          loginExpired: false
        }));
        break;
      case 401:
        const newStateGlobalUser = {
          ...initialStateUser,
          loginExpired: true
        };

        dispatch(agregarUsuarioAction(newStateGlobalUser));
        setLoginSuccess(false);
        window.onbeforeunload = () => {
          logout();
        };
        break
      case 423:
        errorLoginAction('warning', '¡Usuario bloqueado por inactividad de 3 meses, contactar al Administrador!');
        break;
      default:
        errorLoginAction('error', '¡Error de acceso: El usuario NO existe en el sistema!');
        break;
    }
  }, [countryCode, dispatch, errorLoginAction, user, logout]);


  const login = useCallback(async (country = countryCode) => {
    const loginServices = new LoginServices();
    const response = await loginServices.login(country, user.email);
    evaluationResponseLogin(response?.status, country, response);
  }, [countryCode, evaluationResponseLogin, user]);


  const validateSessionExpired = useCallback(async (country = countryCode) => {
    const loginServices = new LoginServices();
    const response = await loginServices.login(country, user.email);

    if (response?.status === 401) {
      evaluationResponseLogin(response?.status, country, response);
    }
  }, [countryCode, evaluationResponseLogin, user]);


  useEffect(() => {
    if (isExistCountry) {
      login();
    }
  }, [isExistCountry, login]);

  useEffect(() => {
    window.addEventListener('focus', () => validateSessionExpired(localStorage.getItem(nameCountryLocal)));

    return () => {
      window.removeEventListener('focus', () => validateSessionExpired(localStorage.getItem(nameCountryLocal)));
    }
  }, [validateSessionExpired]);

  if (userState.loginExpired) {
    return (
      <MuiThemeProvider theme={theme}>
        <LoginSecureAccessExpiredSession />
      </MuiThemeProvider>
    );
  }

  if (isLoading && isExistCountry) {
    return <LoaderBackdrop open={true} />;
  }

  if (!loginSuccess && !isExistCountry) {
    return (
      <MuiThemeProvider theme={theme}>
        <LoginSelectCountryContainer
          onLogin={login}
        />
      </MuiThemeProvider>
    );
  }

  return (
    <Home />
  );
};

LoginSecureAccess.propTypes = {
  user: PropTypes.object.isRequired,
  setOpenMessage: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default LoginSecureAccess;