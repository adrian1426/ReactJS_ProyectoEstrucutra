import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nav: {
    borderRadius: '10px',
    width: '200px',
    marginRight: '10px',
    color: [theme.palette.primary.main],
    justifyContent: 'center'
  },
  navSelected: {
    background: [theme.palette.primary.main],
    color: [theme.palette.primary.contrastText],
    '&:hover': {
      background: [theme.palette.primary.main]
    }
  }
}));

const TabsNavItem = props => {
  const { link, title, selectDefault } = props;
  const classes = useStyles();

  return (
    <ListItem
      button
      className={selectDefault ? `${classes.nav} ${classes.navSelected}` : classes.nav}
      component={NavLink}
      activeClassName={classes.navSelected}
      to={link}
    >
      <Typography>{title}</Typography>
    </ListItem>
  );
};

TabsNavItem.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  selectDefault: PropTypes.bool
};

TabsNavItem.defaultProps = {
  selectDefault: false
};

export default TabsNavItem;