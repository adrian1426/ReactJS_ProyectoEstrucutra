import React from 'react';
import LoginButton from './LoginButton';
import Grid from '@material-ui/core/Grid';
import { nameCountryLocal, nameTokenLocal, nameLastPathLocal } from '../../constants/storage';
import Styles from './Login.module.css';

const Login = () => {
  localStorage.removeItem(nameCountryLocal);
  localStorage.removeItem(nameTokenLocal);
  localStorage.removeItem(nameLastPathLocal);

  return (
    <>
      <div className={Styles.login_container}>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={4} >
            <div className={Styles.login_form}>
              <img className={Styles.login_img} src={require('../../assets/images/bontu.png')} alt='' />
              <LoginButton></LoginButton>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login