import React from 'react';
import ReactDOM from 'react-dom';
import helpers from './helpers';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './context/UserContext';
import './i18next/config';
import App from './App';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
document.documentElement.lang = helpers.codigoIdioma;

ReactDOM.render(
  <UserProvider>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </UserProvider>,
  document.getElementById('root')
);
