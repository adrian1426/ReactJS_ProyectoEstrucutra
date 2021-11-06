import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  margin: '18px 0px 20px 0px'
};

const DialogContent = props => {
  return (
    <div style={styles}>
      {props.children}
    </div>
  );
};

DialogContent.propTypes = {
  children: PropTypes.node
};

DialogContent.defaultProps = {
  children: null
};

export default DialogContent;