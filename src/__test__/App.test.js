import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18next/config';
import { UserProvider } from '../context/UserContext';

describe('App', () => {

  test('app home', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <App />
        </UserProvider>
      </I18nextProvider>
    );

    // expect(screen.getByText('Bievenido amigo')).toBeInTheDocument();
  });
});