import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const DialogActions = props => {

  return (
    <div style={styles}>
      {props.children}
    </div>
  );
};

DialogActions.propTypes = {
  children: PropTypes.node
};

DialogActions.defaultProps = {
  children: null
};

export default DialogActions;