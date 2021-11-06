import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Styles from './DialogContainer.module.css';
import { colorCommonBlack } from '../../../../theme';

const DialogContainer = props => {
  const { open, handleClose, title, children } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{ paper: Styles.Paper }}
      maxWidth='md'
    >
      <div className={Styles.Dialog}>

        <div className={Styles.Dialog_Close}>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <Typography
          className={Styles.Dialog_Title}
          style={{ color: colorCommonBlack }}
        >
          {title}
        </Typography>

        {children}
      </div>
    </Dialog>
  );
};

DialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};

DialogContainer.defaultProps = {
  title: '',
  children: null
};

export default DialogContainer;