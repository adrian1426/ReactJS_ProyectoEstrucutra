import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from './MenuItem';
import MenuAccordion from './MenuAccordion';
import helpers from '../../../helpers';
import MenusItems from '../../../constants/menu.json';
import Styles from './Menu.module.css';

const divisorMultiple = 5;

const Menu = props => {
  const [menuItems, setMenuItems] = useState(MenusItems.data);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
  const [openRowAccordion, setOpenRowAccordion] = useState(0);
  const { open, handleClickAway, anchorRef } = props;

  // const getMenuByUserId = async () => {
  //   const menuServices = new MenuServices();
  //   const response = await menuServices.getMenuByUserId();

  //   if (response.code === 200) {
  //     setMenuItems(response.data);
  //   } else {
  //     setMenuItems([]);
  //   }
  // };

  // useEffect(() => {
  //   getMenuByUserId();
  // }, []);

  const menus = useMemo(
    () => menuItems.filter(items => items.parentId === 0)
    , [menuItems]);

  const subMenus = useMemo(
    () => menuItems.filter(items => items.parentId === selectedMenuItemId)
    , [selectedMenuItemId, menuItems]
  );

  const menusLength = menus.length;

  const rowAccordionOpen = index => {
    const result = index / divisorMultiple;
    const row = Math.floor(result) + 1;
    return row;
  };

  const handleMenuItemClick = (itemId, rowAccordion) => {
    setSelectedMenuItemId(prevSelectedMenuItemId => {
      if (prevSelectedMenuItemId === itemId) {
        setOpenRowAccordion(0);
        return null;
      } else {
        setOpenRowAccordion(rowAccordion);
        return itemId;
      }
    });
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      transition
      className={Styles.Popper}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper className={Styles.Popper_Grow_Paper}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                {
                  menus.map((item, i) => {
                    const isMultiple = helpers.isMultiple((i + 1), divisorMultiple);
                    const rowAccordionMenu = rowAccordionOpen(i);
                    const selected = item.id === selectedMenuItemId;

                    return (
                      <React.Fragment key={item.id}>
                        <MenuItem
                          key={item.id}
                          isMultiple={isMultiple}
                          selected={selected}
                          menu={item}
                          handleMenuItemClick={() => handleMenuItemClick(item.id, rowAccordionMenu)}
                        />
                        <MenuAccordion
                          index={i}
                          rowAccordionOpen={rowAccordionMenu}
                          openRowAccordion={openRowAccordion}
                          isMultiple={isMultiple}
                          subMenus={subMenus}
                          menuLength={menusLength}
                          divisorMultiple={divisorMultiple}
                        />
                      </React.Fragment>
                    )
                  })
                }
              </div>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper >
  );
};

Menu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClickAway: PropTypes.func.isRequired,
  anchorRef: PropTypes.object.isRequired
};

export default Menu;