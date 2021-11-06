import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Styles from './MenuBarToolsMobile.module.css'

const MenuBarToolsMobile = props => {
  const { children } = props;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <React.Fragment>

      <IconButton
        aria-label="show more"
        onClick={handleMobileMenuOpen}
      >
        <MoreIcon />
      </IconButton>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <div className={Styles.Menu}>

          <div className={Styles.Menu_User}>
            {children[0]}
          </div>

          <div className={Styles.Menu_Div} />

          <div className={Styles.Menu_Tools}>
            {children[1]}
          </div>

        </div>
      </Menu>
    </React.Fragment>
  );
};

MenuBarToolsMobile.propTypes = {
  children: PropTypes.node.isRequired
}

export default MenuBarToolsMobile;