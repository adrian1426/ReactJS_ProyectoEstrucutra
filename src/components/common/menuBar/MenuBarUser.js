import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MenuBarUserProfile from './MenuBarUserProfile';

const styles = {
  avatar: {
    width: '30px',
    height: '30px',
    marginRight: '5px'
  },
  button: {
    boxShadow: 'none'
  },
  typography: {
    fontWeight: 'bold',
    fontSize: '13px'
  }
};

const MenuBarUser = props => {
  const { user } = props;
  const { name, picture } = user;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        color="secondary"
        variant="contained"
        style={styles.button}
        onClick={handleClick}
      >
        <Avatar
          alt={name}
          src={picture}
          style={styles.avatar}
        />

        <Typography
          style={styles.typography}
        >
          {name}
        </Typography>
      </Button>

      <MenuBarUserProfile
        anchorEl={anchorEl}
        handleClose={handleClose}
        user={user}
      />
    </React.Fragment>
  );
};

MenuBarUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    picture: PropTypes.string
  })
};

export default MenuBarUser;