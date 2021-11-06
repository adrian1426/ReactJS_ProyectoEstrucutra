import React from 'react';
import PropTypes from 'prop-types';
import ProfilesSelectMenuCheck from './ProfilesSelectMenuCheck';
import { refsMenuAccess } from '../../../constants/refsCollection'
import Styles from './ProfilesSelectMenu.module.css';

const styles = {
  module: {
    fontWeight: 500,
    color: 'black'
  },
  menu: {
    fontWeight: 550,
  },
  submenu: {
    fontWeight: 500
  }
};

const ProfilesSelectMenu = props => {
  const { moduleMenu, isSelectedAll, onChangeSelectModule, onChangeSelectMenu, onChangeSelectSubMenu, selectedMenus } = props;

  return (
    <React.Fragment>
      {
        //Iteration - CheckModules
        moduleMenu.map(item => {
          const refMenu = `${refsMenuAccess}/${item.id}`;
          const selectedMenusByModule = selectedMenus.filter(iFilter => iFilter.menuAccessRef === refMenu);
          let totalSubmenusByModule = 0;
          let totalSubmenusSelectedByModule = 0;

          item.menus.map(iMenu => {
            return iMenu.submenus.map(iSubmenu => {
              return totalSubmenusByModule++;
            });
          });

          selectedMenusByModule.map(itemModule => {
            return itemModule.menus.map(iMenu => {
              return iMenu.subMenus.map(iSubmenu => {
                return totalSubmenusSelectedByModule++;
              });
            })
          });

          const selectedModuleAll = (totalSubmenusSelectedByModule === totalSubmenusByModule) && totalSubmenusSelectedByModule > 0;
          const indeterminateModule = totalSubmenusSelectedByModule > 0 && (totalSubmenusSelectedByModule < totalSubmenusByModule);
          const checkedModule = isSelectedAll || selectedModuleAll;

          return (
            <React.Fragment key={item.id}>
              <ProfilesSelectMenuCheck
                item={item}
                style={styles.module}
                checked={checkedModule}
                indeterminate={indeterminateModule}
                onChange={() => onChangeSelectModule(item)}
              />

              {
                //Iteration - CheckMenus
                item.menus.map(itemMenu => {
                  const refMenuItem = `${refMenu}/menus/${itemMenu.id}`;
                  const selectedMenusByRefModule = selectedMenusByModule[0]?.menus || [];
                  const selectedMenusByMenu = selectedMenusByRefModule.filter(iFilterMenu => iFilterMenu.menuRef === refMenuItem);
                  let totalSubmenusByMenu = 0;
                  let totalSubmenusSelectedByMenu = 0;

                  itemMenu.submenus.map(iSubmenu => {
                    return totalSubmenusByMenu++;
                  });

                  selectedMenusByMenu.map(iMenu => {
                    return iMenu.subMenus.map(iSubmenu => {
                      return totalSubmenusSelectedByMenu++;
                    });
                  });

                  const selectedMenuAll = (totalSubmenusSelectedByMenu === totalSubmenusByMenu) && totalSubmenusSelectedByMenu > 0;
                  const indeterminateMenu = totalSubmenusSelectedByMenu > 0 && (totalSubmenusSelectedByMenu < totalSubmenusByMenu);
                  const checkedMenu = checkedModule || selectedMenuAll;

                  return (
                    <div
                      key={itemMenu.id}
                      className={Styles.menuItems}
                    >
                      <ProfilesSelectMenuCheck
                        item={itemMenu}
                        style={styles.menu}
                        checked={checkedMenu}
                        indeterminate={indeterminateMenu}
                        onChange={() => onChangeSelectMenu(item, itemMenu)}
                      />

                      {
                        //Iteration - CheckSubmenus
                        itemMenu.submenus.map(itemSubmenu => {
                          const refSubmenuItem = `${refMenuItem}/submenus/${itemSubmenu.id}`;
                          const selectedSubmenusByMenu = selectedMenusByMenu[0]?.subMenus || [];
                          const existSubmenuInSelect = selectedSubmenusByMenu.find(iFind => iFind.subMenuRef === refSubmenuItem) !== undefined ? true : false;
                          const checkedSubmenu = checkedMenu || existSubmenuInSelect;

                          return (
                            <div
                              key={itemSubmenu.id}
                              className={Styles.subMenuItems}
                            >
                              <ProfilesSelectMenuCheck
                                item={itemSubmenu}
                                style={styles.submenu}
                                checked={checkedSubmenu}
                                indeterminate={false}
                                onChange={() => onChangeSelectSubMenu(item, itemMenu, itemSubmenu)}
                              />
                            </div>
                          )
                        })
                        //End Iteration - CheckSubmenus
                      }
                    </div>
                  )
                })
                //End Iteration - CheckMenus
              }
            </React.Fragment>
          )
        })
        //End Iteration - CheckModules
      }
    </React.Fragment>
  );
};

ProfilesSelectMenu.propTypes = {
  moduleMenu: PropTypes.array.isRequired,
  isSelectedAll: PropTypes.bool.isRequired,
  onChangeSelectModule: PropTypes.func.isRequired,
  onChangeSelectMenu: PropTypes.func.isRequired,
  onChangeSelectSubMenu: PropTypes.func.isRequired,
  selectedMenus: PropTypes.array.isRequired
};

export default ProfilesSelectMenu;