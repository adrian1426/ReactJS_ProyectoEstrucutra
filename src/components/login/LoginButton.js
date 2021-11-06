import React from 'react';
import Button from '@material-ui/core/Button';
import {useAuth0} from '@auth0/auth0-react';
import Styles from './Login.module.css';

const LoginButton=()=>{
    
    const { loginWithRedirect} = useAuth0();
    return(
        <Button variant="contained" color="primary" id={Styles.login_button}
        onClick={() => loginWithRedirect()}>
            Iniciar sesión Auth0
        </Button>
    );

}
export default LoginButton