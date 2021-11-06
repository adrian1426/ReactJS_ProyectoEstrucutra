import React from 'react';
import PropTypes from 'prop-types';

const Status = props => {
  const { title, background } = props;

  const styles = {
    background: background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '27px',
    height: '28px',
    color: '#fff',
  };

  return (
    <div style={styles}>
      {title}
    </div>
  );
};

Status.propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired
};

export default Status;