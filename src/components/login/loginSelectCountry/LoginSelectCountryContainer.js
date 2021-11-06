import React from 'react';
import LoginSelectCountry from './LoginSelectCountry';
import Styles from './LoginBackGround.module.css';

const countries = [
  {
    id: 'Yrp8apx8xYIgFq4WcRRw',
    name: 'México',
    order: 1,
    value: 'mx',
    languaje: 'es_mx'
  },
  {
    id: 'qAHpfzXkE44uDe6Km3oG',
    name: 'Colombia',
    order: 2,
    value: 'co',
    languaje: 'es_co'
  }
];

const LoginSelectCountryContainer = props => {
  const { onLogin } = props;

  return (
    <div className={Styles.background}>
      <LoginSelectCountry
        countries={countries}
        onLogin={onLogin}
      />
    </div>
  );
};

export default LoginSelectCountryContainer;