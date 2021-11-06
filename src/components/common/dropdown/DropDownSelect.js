import React, { useState } from 'react';
import Buttom from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const styles = {
  btn: {
    borderRadius: '10px',
    background: '#EDEDED'
  }
};

const DropDownSelect = props => {
  const { options, value, label, indexSelect = 0, dataTable = null, onClickItem } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(indexSelect);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickItem = (index, option) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    onClickItem(option, dataTable);
  };

  return (
    <div>
      <Buttom
        style={styles.btn}
        variant='contained'
        endIcon={<ArrowDropDownIcon />}
        onClick={handleOpen}
      >
        {options[selectedIndex][label]}
      </Buttom>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          options.map((option, i) => (
            <MenuItem
              key={i}
              value={option[value]}
              selected={i === selectedIndex}
              onClick={() => handleClickItem(i, option)}
            >
              {option[label]}
            </MenuItem>
          ))
        }
      </Menu>
    </div>
  );
};

export default DropDownSelect;