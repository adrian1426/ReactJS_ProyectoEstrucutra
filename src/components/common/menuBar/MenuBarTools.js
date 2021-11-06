import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import HelpIcon from '@material-ui/icons/Help';
import StarIcon from '@material-ui/icons/Star';
import NotificationIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    background: [theme.palette.iconButtonBar.main],
    marginRight: '10px',
    padding: '5px'
  }
}));

const MenuBarTools = props => {
  const { notification } = props;
  const classes = useStyles();

  return (
    <React.Fragment>

      <IconButton className={classes.button}>
        <HelpIcon />
      </IconButton>

      <IconButton className={classes.button}>
        <StarIcon />
      </IconButton>

      <IconButton className={classes.button} aria-label="show new notifications">
        <Badge badgeContent={notification} color="error">
          <NotificationIcon />
        </Badge>
      </IconButton>

    </React.Fragment>
  );
};

MenuBarTools.propTypes = {
  notification: PropTypes.number
};

MenuBarTools.defaultProps = {
  notification: 0
}

export default MenuBarTools;