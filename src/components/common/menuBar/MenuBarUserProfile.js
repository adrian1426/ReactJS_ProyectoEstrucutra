import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';
import { colorIconDefault, colorCommonBlack } from '../../../theme';
import Styles from './MenuBarUserProfile.module.css';

const originPopover = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center'
  }
};

const MenuBarUserProfile = props => {
  const { anchorEl, handleClose, user } = props;
  const { email, profile } = user;
  const { logout } = useAuth0();
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { t } = useTranslation('profile');

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={originPopover.anchorOrigin}
      transformOrigin={originPopover.transformOrigin}
      classes={{ paper: Styles.Paper }}
    >
      <div className={Styles.Container}>

        <div className={Styles.Container_Info}>

          <div className={Styles.Container_Info_Item}>
            <EmailIcon
              className={Styles.Container_Info_Item_Icon}
              style={{ color: colorIconDefault }}
            />
            <Typography
              style={{ color: colorCommonBlack }}
            >
              {email}
            </Typography>
          </div>

          <div className={Styles.Container_Info_Item}>
            <WorkIcon
              className={Styles.Container_Info_Item_Icon}
              style={{ color: colorIconDefault }}
            />
            <Typography
              style={{ color: colorCommonBlack }}
            >
              {profile}
            </Typography>
          </div>

        </div>

        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={logout}
          className={Styles.Container_Button}
        >
          {t('sesion')}
        </Button>
      </div>
    </Popover >
  );
};

MenuBarUserProfile.propTypes = {
  anchorEl: PropTypes.object,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired
  }).isRequired
};

MenuBarUserProfile.defaultProps = {
  anchorEl: null
};

export default MenuBarUserProfile;