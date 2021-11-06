import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../menu/Menu';
import { useLocation } from 'react-router-dom';

const MenuBarButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);
  const location = useLocation();

  const handleClickMenu = () => {
    setOpenMenu(prevOpenMenu => !prevOpenMenu);
  };

  const handleClickAway = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <IconButton
        aria-label="menu"
        onClick={handleClickMenu}
        ref={anchorRef}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        open={openMenu}
        handleClickAway={handleClickAway}
        anchorRef={anchorRef}
      />
    </React.Fragment>
  );
};

export default MenuBarButton;