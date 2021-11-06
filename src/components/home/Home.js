import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';
import MenuBar from '../common/menuBar/MenuBar';
import ProtectedRoute from '../../router/ProtectedRoute';
import AppRouter from '../../router/AppRouter';
import DialogConfirm from './../common/dialog/dialogConfirm/DialogConfirm';
import Message from './../common/message/Message';
import { HomeProvider } from '../../context/HomeContext';
import { rootReducer } from './../../context/reducer/rootReducer';
import { initialStateConfirmation } from '../../context/initialState/confirmation';
import { initialStateMessage } from '../../context/initialState/message';
import Styles from './Home.module.css';

const Home = () => {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <MenuBar />

        <div className={Styles.home}>
          <HomeProvider
            reducer={rootReducer}
            initialState={{
              confirmationState: initialStateConfirmation,
              messageState: initialStateMessage
            }}
          >
            <Switch>
              <ProtectedRoute path="/" component={AppRouter} />
            </Switch>

            <DialogConfirm />
            <Message />
          </HomeProvider>
        </div>

      </MuiThemeProvider>
    </Router>
  );
};

export default Home;
