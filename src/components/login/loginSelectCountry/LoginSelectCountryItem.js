import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import iconDefault from '../../../assets/icons/countries/default.svg';

const styles = {
  button: {
    width: '48%',
    height: '150px',
    marginBottom: '15px'
  },
  button__Content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttton__Title: {
    fontWeight: 800
  }
};

const LoginSelectCountryItem = props => {
  const { isSelected, country, onClickCountry } = props;
  const [iconCountry, setIconCountry] = useState(null);
  const colorButton = isSelected ? 'secondary' : 'primary';
  const variantButton = isSelected ? 'contained' : null;

  const loadImage = useCallback(() => {
    import(`../../../assets/icons/countries/${country.value}.svg`)
      .then(image => {
        setIconCountry(image.default);
      })
      .catch(() => {
        setIconCountry(iconDefault);
      });
  }, [country.value]);

  useEffect(() => {
    loadImage();
  }, [loadImage]);

  return (
    <Button
      style={styles.button}
      color={colorButton}
      variant={variantButton}
      onClick={onClickCountry}
    >
      <div style={styles.button__Content}>
        <img
          src={iconCountry}
          alt={country.name}
          height={100}
        />

        <Typography style={styles.buttton__Title}>
          {country.name}
        </Typography>
      </div>
    </Button>
  );
};

LoginSelectCountryItem.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  country: PropTypes.object.isRequired,
  onClickCountry: PropTypes.func.isRequired
};

export default LoginSelectCountryItem;