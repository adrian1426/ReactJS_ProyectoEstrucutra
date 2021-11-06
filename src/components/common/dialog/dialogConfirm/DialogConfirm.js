import React, { useContext } from 'react';
import DialogContainer from './../dialogContainer/DialogContainer';
import DialogContent from './../dialogContainer/DialogContent';
import DialogActions from './../dialogContainer/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { hideConfirmationAction } from '../../../../context/actions/confirmation/confirmationAction';
import HomeContext from '../../../../context/HomeContext';

const styles = {
  button: {
    borderRadius: '15px !important',
    marginLeft: '13px',
    width: '150px'
  }
};

const DialogConfirm = () => {
  const [{ confirmationState }, dispatch] = useContext(HomeContext);
  const { open, textPrimary, textSecundary, actionConfirm, infoOnly } = confirmationState;

  const handleClose = () => {
    dispatch(hideConfirmationAction());
  };

  return (
    <DialogContainer
      open={open}
      handleClose={handleClose}
      title={textPrimary}
    >
      <div>
        <DialogContent>
          <Typography dangerouslySetInnerHTML={{ __html: textSecundary }} />
        </DialogContent>

        <DialogActions>
          {!infoOnly &&
            (
              <Button
                style={styles.button}
                color="primary"
                variant="outlined"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            )
          }

          <Button
            style={styles.button}
            color="primary"
            variant="contained"
            onClick={actionConfirm}
          >
            Aceptar
          </Button>
        </DialogActions>
      </div>
    </DialogContainer>
  );
};

export default DialogConfirm;