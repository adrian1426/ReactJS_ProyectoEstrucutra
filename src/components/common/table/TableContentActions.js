import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';

const styles = {
  button: {
    padding: '6px'
  },
  icon: {
    fontSize: '1.3rem'
  }
};

const TableContentActions = props => {
  const { tooltip, Icon, onClick, visible, disabled } = props;

  return visible ? (
    <Tooltip title={tooltip}>
      <span>
        <IconButton
          size="small"
          onClick={onClick}
          style={styles.button}
          disabled={disabled}
        >
          {<Icon style={styles.icon} />}
        </IconButton>
      </span>
    </Tooltip>
  ) : null;
};

TableContentActions.propTypes = {
  tooltip: PropTypes.string,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  disabled: PropTypes.bool
};

TableContentActions.defaultProps = {
  tooltip: '',
  Icon: AppsIcon,
  visible: true,
  disabled: false
};

export default TableContentActions;