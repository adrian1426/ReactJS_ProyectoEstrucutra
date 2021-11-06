import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18next/config';
// import Home from '../../../components/home/Home';
import { UserProvider } from '../../../context/UserContext';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter } from "react-router-dom";
import theme from '../../../theme';

describe('App', () => {
  test('app home', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <MuiThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['/']}>
              {/* <Home /> */}
            </MemoryRouter>
          </MuiThemeProvider>
        </UserProvider>
      </I18nextProvider>
    );
  })
});