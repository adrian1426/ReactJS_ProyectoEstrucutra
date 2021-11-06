import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import LanguageIcon from '@material-ui/icons/Language';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    background: [theme.palette.iconButtonBar.main],
    padding: '4px 5px',
    marginRight: '10px'
  },
  label: {
    marginLeft: '3px',
    minWidth: '18.11px'
  }
}));

const MenuBarLocales = (props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { languages } = props;
  const { i18n } = useTranslation();
  const classes = useStyles();

  const handleMenuItemClick = (event, index) => {
    i18n.changeLanguage(languages[index].actionCode);
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        className={classes.button}
        size="small"
        onClick={handleToggle}
      >
        <LanguageIcon />
        <Typography className={classes.label}>
          {languages[selectedIndex].code}
        </Typography>
        <ArrowDropDownIcon />
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} transition style={{ zIndex: 1100 }} >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {languages.map((option, index) => (
                    <MenuItem
                      key={option.code}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option.language}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

MenuBarLocales.propTypes = {
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      actionCode: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired
    }).isRequired
  )
}

export default MenuBarLocales;