import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import LoginSecureAccess from './components/login/loginSecureAccess/LoginSecureAccess';
import Login from './components/login/Login';
import { useAuth0 } from "@auth0/auth0-react";
import LoaderBackdrop from './components/common/loader/LoaderBackdrop';
import LoginSecureAccessMessages from './components/login/loginSecureAccess/LoginSecureAccessMessages';
import { initialStateMessage } from './components/login/loginSecureAccess/initialStateMessage';
import { nameTokenLocal } from './constants/storage';
import axios from 'axios';
import './App.css';

function App() {
  const { isAuthenticated, isLoading, error, user, getIdTokenClaims, logout } = useAuth0();
  const [messageAlert, setMessageAlert] = useState(initialStateMessage);

  //config interceptor axios
  //resquest axios
  axios.interceptors.request.use((config) => {
    //add token in headers
    getIdTokenClaims()
      .then(token => {
        const tokenLocal = localStorage.getItem(nameTokenLocal);
        const tkn = tokenLocal || token.__raw;
        config.headers.Authorization = `Bearer ${tkn}`;
      })
      .catch(() => {
        config.headers.Authorization = `Bearer NoToken`;
      });
    //end add token headers

    //transform response
    config.validateStatus = status => {
      if (status === 200) {
        config.transformResponse = [(data) => {
          const res = JSON.parse(data);

          //quitar el nodo token en el response
          let newRes = null;
          if (res?.data.length > 0) {
            const indexToken = res.data.length - 1;
            res?.data[indexToken]?.token && localStorage.setItem(nameTokenLocal, res.data[indexToken].token);

            newRes = {
              ...res,
              data: res.data.filter(item => item.token === undefined)
            };
          } else {
            res?.data?.token && localStorage.setItem(nameTokenLocal, res.data.token);
            delete res.data['token'];
            newRes = res;
          }

          return newRes.data;
        }];

      } else {
        config.transformResponse = [(data) => {
          const res = JSON.parse(data);
          const newResponse = {
            ...res,
            errorRes: {
              code: res?.code,
              title: res?.title,
              detail: res?.description || 'error operation'
            }
          };
          return newResponse.errorRes;
        }];

      }
    };
    //end transform response

    return config;
  }, (err) => {
    return Promise.reject(err);
  });
  //end request axios

  //response axios
  axios.interceptors.response.use((response) => {
    return response;
  }, (err) => {
    return Promise.reject(err);
  });
  //end response axios
  //end config interceptor axios


  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <LoaderBackdrop open={true} />;
  }

  if (isAuthenticated) {
    return (
      <React.Fragment>
        <LoginSecureAccess
          user={user}
          setOpenMessage={setMessageAlert}
          logout={logout}
        />

        <LoginSecureAccessMessages
          messageAlert={messageAlert}
          setOpenMessage={setMessageAlert}
          logout={logout}
        />
      </React.Fragment>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;