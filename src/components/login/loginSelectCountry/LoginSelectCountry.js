import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DialogContainer from '../../common/dialog/dialogContainer/DialogContainer';
import DialogContent from '../../common/dialog/dialogContainer/DialogContent';
import DialogActions from '../../common/dialog/dialogContainer/DialogActions';
import LoginSelectCountryItem from './LoginSelectCountryItem';
import Button from '@material-ui/core/Button';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  button: {
    width: '150px',
    borderRadius: '15px !important',
    marginLeft: '13px'
  }
};

const LoginSelectCountry = props => {
  const { countries, onLogin } = props;
  const [countrySelected, setCountrySelected] = useState(null);
  const { logout } = useAuth0();
  const { t } = useTranslation('login');

  const onClickCountry = countrySelect => {
    setCountrySelected(countrySelect);
  };

  const onClickLogin = () => {
    onLogin(countrySelected.value);
  };

  return (
    <DialogContainer
      open={true}
      title={t('selectCountry.title')}
      handleClose={logout}
    >
      <div>
        <DialogContent>
          <div style={styles.content}>
            {
              countries.map((item) => (
                <LoginSelectCountryItem
                  key={item.value}
                  isSelected={item.value === countrySelected?.value}
                  country={item}
                  onClickCountry={() => onClickCountry(item)}
                />
              ))
            }
          </div>
        </DialogContent>

        <DialogActions>
          <Button
            style={styles.button}
            color="primary"
            variant="outlined"
            onClick={logout}
          >
            {t('selectCountry.actionCancel')}
          </Button>

          <Button
            style={styles.button}
            color="primary"
            variant="contained"
            disabled={countrySelected === null}
            onClick={onClickLogin}
          >
            {t('selectCountry.actionAccept')}
          </Button>
        </DialogActions>
      </div>
    </DialogContainer>
  );
};

LoginSelectCountry.propTypes = {
  countries: PropTypes.array.isRequired,
  onLogin: PropTypes.func.isRequired
};

export default LoginSelectCountry;