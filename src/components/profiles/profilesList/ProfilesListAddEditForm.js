import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useForm from '../../../hooks/useForm';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from './../../common/dialog/dialogContainer/DialogContent';
import DialogActions from './../../common/dialog/dialogContainer/DialogActions';
import ProfilesListAddEditFormActions from './ProfilesListAddEditFormActions'
import MenuServices from '../../../services/MenuServices';
import RoleServices from '../../../services/RoleServices';
import { refsUser, refsMenuAccess } from '../../../constants/refsCollection';
import UserContext from '../../../context/UserContext';
import { menuAccess } from '../../../constants/catalogs';
import ProfilesSelectMenu from '../profilesSelectMenu/ProfilesSelectMenu';
import LinearProgress from '@material-ui/core/LinearProgress';
import helpers from '../../../helpers';
import Styles from './ProfilesList.module.css';

const profileTransformStatic = (user, profilesLength) => {
  const profileData = {
    isAdmin: true,
    isActive: true,
    isDeleted: false,
    description: 'perfil Admin',
    userEditRef: `${refsUser}/${user.id}`,
    order: profilesLength,
  };

  return profileData;
};

const profileTransformData = (name, isReadOnly, access, isHR, menuAccess) => {
  const profileData = { name, isReadOnly, access, isHR, menuAccess };
  return profileData;
};

const ProfilesListAddEditForm = props => {
  const { countryId, profileEdit, onClose, onAddProfile, onEditProfile, profilesLength } = props;

  const stateInitial = {
    id: profileEdit?.id,
    name: profileEdit?.name,
    isReadOnly: profileEdit?.isReadOnly !== undefined ? profileEdit.isReadOnly : false,
    isHR: profileEdit?.isHR !== undefined ? profileEdit.isHR : false
  };

  const { newPropsInputValue, fields } = useForm(stateInitial);
  const [valueRol, setValueRol] = useState(stateInitial.isReadOnly);
  const [valueRH, setValueRH] = useState(stateInitial.isHR);
  const [isLoadMenus, setIsLoadMenus] = useState(true);
  const [dataMenu, setDataMenu] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [validationError, setValidationError] = useState({ nameRol: false, selectMenu: false });
  const { state: userState } = useContext(UserContext);
  const titleAccess = selectedAll ? menuAccess[0].name : menuAccess[1].name;

  const handleChangeRol = (event) => {
    setValueRol(event.target.value === 'true' ? true : false);
  };

  const handleChangeRH = (event) => {
    setValueRH(event.target.value === 'true' ? true : false);
  };


  const getRolById = useCallback(async () => {
    const roleServices = new RoleServices();
    const response = await roleServices.getRolesById(countryId, profileEdit.id);

    if (response?.status === 200 && response.data.menuAccess.length > 0) {
      setSelectedMenus(response.data.menuAccess);
    } else {
      setSelectedMenus([]);
    }
  }, [countryId, profileEdit]);

  const getMenus = useCallback(async () => {
    const menuServices = new MenuServices();
    const response = await menuServices.getMenus(countryId);

    if (response?.status === 200 && response.data.length > 0) {
      setDataMenu(response.data);
      setIsLoadMenus(false);
    } else {
      setDataMenu([]);
      setIsLoadMenus(false);
    }
  }, [countryId]);

  const moduleMenu = useMemo(() => dataMenu.filter(items => items.isActive === true), [dataMenu]);

  const selectedAllMenus = () => {
    if (!selectedAll) {
      const newSelectedMenus = dataMenu.map(item => {
        return {
          menuAccessRef: `${refsMenuAccess}/${item.id}`,
          menus: item.menus.map(itemMenu => {
            const refMenus = `${refsMenuAccess}/${item.id}/menus/${itemMenu.id}`
            return {
              menuRef: refMenus,
              subMenus: itemMenu.submenus.map(itemSubmenu => {
                return {
                  subMenuRef: `${refMenus}/submenus/${itemSubmenu.id}`,
                };
              })
            };
          })
        }
      });

      setSelectedMenus(newSelectedMenus);
    } else {
      setSelectedMenus([]);
    }
  };

  const onChangeSelectModule = (itemModule) => {
    const refModule = `${refsMenuAccess}/${itemModule.id}`;
    const menusModule = dataMenu.filter(iModule => iModule.id === itemModule.id)[0];

    const newSelectedModule = {
      menuAccessRef: refModule,
      menus: menusModule.menus.map(iMenu => {
        const refMenu = `${refModule}/menus/${iMenu.id}`;

        return {
          menuRef: refMenu,
          subMenus: iMenu.submenus.map(iSubmenu => {
            return {
              subMenuRef: `${refMenu}/submenus/${iSubmenu.id}`
            };
          })
        };
      })
    };

    const existModule = selectedMenus.find(iFind => iFind.menuAccessRef === newSelectedModule.menuAccessRef) !== undefined ? true : false;

    if (existModule) {
      const newSelectedMenus = selectedMenus.filter(iFilter => iFilter.menuAccessRef !== newSelectedModule.menuAccessRef);
      setSelectedMenus(newSelectedMenus);
    } else {
      setSelectedMenus([...selectedMenus, newSelectedModule]);
    }

  };

  const onChangeSelectMenu = (itemModule, itemMenu) => {
    const refModule = `${refsMenuAccess}/${itemModule.id}`;
    const refMenu = `${refModule}/menus/${itemMenu.id}`;
    const menusOptions = dataMenu.filter(iModule => iModule.id === itemModule.id)[0].menus.filter(iMenu => iMenu.id === itemMenu.id)[0];

    const newSelectedMenu = {
      menuAccessRef: refModule,
      menus: [
        {
          menuRef: refMenu,
          subMenus: menusOptions.submenus.map(iSubmenu => {
            return {
              subMenuRef: `${refMenu}/submenus/${iSubmenu.id}`
            };
          })
        }
      ]
    };

    const existModule = selectedMenus.find(iFind => iFind.menuAccessRef === newSelectedMenu.menuAccessRef) !== undefined ? true : false;
    const existMenu = selectedMenus.find(iFind => {
      return iFind.menus.find(iFindMenus => iFindMenus.menuRef === newSelectedMenu.menus[0].menuRef);
    }) !== undefined ? true : false;

    if (existModule) {
      if (existMenu) {

        const lengthMenus = selectedMenus
          .filter(iMenu => iMenu.menuAccessRef === newSelectedMenu.menuAccessRef)[0]
          .menus.length;

        if (lengthMenus === 1) {
          const newSelectedMenus = selectedMenus.filter(iFilter => iFilter.menuAccessRef !== newSelectedMenu.menuAccessRef);
          setSelectedMenus(newSelectedMenus);
        } else {
          const newSelectedMenus = selectedMenus?.map(iModule => {
            if (iModule.menuAccessRef === newSelectedMenu.menuAccessRef) {
              return {
                menuAccessRef: refModule,
                menus: iModule.menus.filter(iFilter => iFilter.menuRef !== newSelectedMenu.menus[0].menuRef)
              }
            } else {
              return iModule;
            }
          });

          setSelectedMenus(newSelectedMenus);
        }


      } else {
        const newSelectedMenus = selectedMenus.map(iModule => {
          if (iModule.menuAccessRef === newSelectedMenu.menuAccessRef) {
            return {
              menuAccessRef: refModule,
              menus: [...iModule.menus, newSelectedMenu.menus[0]]
            }
          } else {
            return iModule;
          }
        });

        setSelectedMenus(newSelectedMenus);
      }
    } else {
      setSelectedMenus([...selectedMenus, newSelectedMenu]);
    }
  };

  const onChangeSelectSubMenu = (itemModule, itemMenu, itemSubmenu) => {
    const refModule = `${refsMenuAccess}/${itemModule.id}`;
    const refMenu = `${refModule}/menus/${itemMenu.id}`;
    const refSubMenu = `${refMenu}/submenus/${itemSubmenu.id}`;

    const newSelectedSubmenu = {
      menuAccessRef: refModule,
      menus: [
        {
          menuRef: refMenu,
          subMenus: [{
            subMenuRef: refSubMenu
          }]
        }
      ]
    };

    const existModule = selectedMenus.find(iFind => iFind.menuAccessRef === newSelectedSubmenu.menuAccessRef) !== undefined ? true : false;

    const existMenu = selectedMenus.find(iFind => {
      return iFind.menus.find(iFindMenus => iFindMenus.menuRef === newSelectedSubmenu.menus[0].menuRef);
    }) !== undefined ? true : false;

    const existSubmenu = selectedMenus.find(iFind => {
      return iFind.menus.find(iFindMenus => {
        return iFindMenus.subMenus.find(iFindSubmenus => iFindSubmenus.subMenuRef === newSelectedSubmenu.menus[0].subMenus[0].subMenuRef);
      });
    }) !== undefined ? true : false;

    if (existModule) {
      if (existMenu) {
        if (existSubmenu) {

          const lengthSubmenus = selectedMenus
            .filter(iModule => iModule.menuAccessRef === newSelectedSubmenu.menuAccessRef)[0]
            .menus.filter(iMenu => iMenu.menuRef === newSelectedSubmenu.menus[0].menuRef)[0]
            .subMenus.length;

          if (lengthSubmenus === 1) {
            const menus = selectedMenus.filter(iFilter => iFilter.menuAccessRef === newSelectedSubmenu.menuAccessRef)[0].menus;

            if (menus.length === 1) {
              const newSelectedMenus = selectedMenus.filter(iFilter => iFilter.menuAccessRef !== newSelectedSubmenu.menuAccessRef);
              setSelectedMenus(newSelectedMenus);
            } else {
              const newSelectedMenus = selectedMenus.map(iFilter => {
                if (iFilter.menuAccessRef === refModule) {
                  return {
                    menuAccessRef: refModule,
                    menus: iFilter.menus.filter(iFilterMenu => iFilterMenu.menuRef !== newSelectedSubmenu.menus[0].menuRef)
                  }
                } else {
                  return iFilter;
                }
              });

              setSelectedMenus(newSelectedMenus);
            }

          } else {
            const newSelectedMenus = selectedMenus.map(iModule => {
              if (iModule.menuAccessRef === newSelectedSubmenu.menuAccessRef) {
                return {
                  menuAccessRef: refModule,
                  menus: iModule.menus.map(iMenu => {
                    if (iMenu.menuRef === newSelectedSubmenu.menus[0].menuRef) {
                      return {
                        menuRef: refMenu,
                        subMenus: iMenu.subMenus.filter(iSub => iSub.subMenuRef !== newSelectedSubmenu.menus[0].subMenus[0].subMenuRef)
                      };
                    } else {
                      return iMenu;
                    }
                  })
                };
              } else {
                return iModule;
              }
            });

            setSelectedMenus(newSelectedMenus);
          }

        } else {
          const newSelectedMenus = selectedMenus.map(iModule => {
            if (iModule.menuAccessRef === newSelectedSubmenu.menuAccessRef) {
              return {
                menuAccessRef: refModule,
                menus: iModule.menus.map(iMenu => {
                  if (iMenu.menuRef === newSelectedSubmenu.menus[0].menuRef) {
                    return {
                      menuRef: refMenu,
                      subMenus: [...iMenu.subMenus, newSelectedSubmenu.menus[0].subMenus[0]]
                    };
                  } else {
                    return iMenu;
                  }
                })
              };
            } else {
              return iModule;
            }
          });

          setSelectedMenus(newSelectedMenus);
        }
      } else {
        const newSelectedMenus = selectedMenus.map(iModule => {
          if (iModule.menuAccessRef === newSelectedSubmenu.menuAccessRef) {
            return {
              menuAccessRef: refModule,
              menus: [...iModule.menus, newSelectedSubmenu.menus[0]]
            }
          } else {
            return iModule;
          }
        });

        setSelectedMenus(newSelectedMenus);
      }
    } else {
      setSelectedMenus([...selectedMenus, newSelectedSubmenu]);
    }

  };

  const validation = () => {
    const valNameRolError = helpers.validationNull(fields.name);
    const valSelectMenuError = selectedMenus.length <= 0;

    setValidationError({
      nameRol: valNameRolError,
      selectMenu: valSelectMenuError
    });

    return valNameRolError || valSelectMenuError;
  };

  const addProfile = () => {
    const newFields = {
      ...profileTransformStatic(userState, profilesLength + 1),
      ...profileTransformData(fields.name, valueRol, titleAccess, valueRH, selectedMenus)
    };

    if (!validation()) {
      onAddProfile(newFields);
    }
  };

  const editProfile = () => {
    const newFields = {
      ...profileTransformStatic(userState, profileEdit.order),
      id: profileEdit.id,
      ...profileTransformData(fields.name, valueRol, titleAccess, valueRH, selectedMenus)
    };

    if (!validation()) {
      onEditProfile(newFields);
    }
  };

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  useEffect(() => {
    if (profileEdit?.id !== undefined && dataMenu.length > 0) {
      getRolById();
    }
  }, [profileEdit, dataMenu, getRolById]);

  useEffect(() => {
    let totalSubmenusDataMenu = 0;
    let totalSubmenusSelectedMenu = 0;

    dataMenu.map(itemModule => {
      return itemModule.menus.map(iMenu => {
        return iMenu.submenus.map(iSubmenu => {
          return totalSubmenusDataMenu++;
        });
      })
    });

    selectedMenus.map(itemModule => {
      return itemModule.menus.map(iMenu => {
        return iMenu.subMenus.map(iSubmenu => {
          return totalSubmenusSelectedMenu++;
        });
      })
    });

    if ((totalSubmenusSelectedMenu === totalSubmenusDataMenu) && (totalSubmenusSelectedMenu > 0)) {
      setSelectedAll(true);
    } else {
      setSelectedAll(false);
    }
  }, [dataMenu, selectedMenus]);

  return (
    <div className={Styles.form}>
      <DialogContent>
        <TextField
          placeholder='Nombre del Perfil...'
          variant="outlined"
          fullWidth
          error={validationError.nameRol}
          {...newPropsInputValue('name')}
        />

        <div className={Styles.selectRadio}>
          <FormControl component="fieldset" >
            <FormLabel component="legend">Seleccione rol</FormLabel>
            <RadioGroup row value={valueRol} onChange={handleChangeRol}  >
              <FormControlLabel value={false} control={<Radio color="primary" />} label="Escritura" />
              <FormControlLabel value={true} control={<Radio color="primary" />} label="Lectura" />
            </RadioGroup>

            <FormLabel component="legend">¿Perfil RH?</FormLabel>
            <RadioGroup row value={valueRH} onChange={handleChangeRH}  >
              <FormControlLabel value={false} control={<Radio color="primary" />} label="No" />
              <FormControlLabel value={true} control={<Radio color="primary" />} label="Sí" />
            </RadioGroup>

            <FormLabel component="legend">Seleccione accesos(vistas)</FormLabel>
            <FormControlLabel
              value="selectAll"
              control={
                <Checkbox
                  color="primary"
                  onChange={selectedAllMenus}
                  checked={selectedAll}
                />}
              label="Seleccionar todos"
            />
          </FormControl>
        </div>
        <div
          className={`${Styles.selectItems} ${validationError.selectMenu ? Styles.selectItems_Error : ''}`}
        >
          <div className={Styles.divItems}>
            {
              isLoadMenus ? <LinearProgress /> : (
                <ProfilesSelectMenu
                  moduleMenu={moduleMenu}
                  isSelectedAll={selectedAll}
                  onChangeSelectMenu={onChangeSelectMenu}
                  onChangeSelectModule={onChangeSelectModule}
                  onChangeSelectSubMenu={onChangeSelectSubMenu}
                  selectedMenus={selectedMenus}
                />
              )
            }
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <ProfilesListAddEditFormActions
          onClose={onClose}
          onAddProfile={addProfile}
          onEditProfile={editProfile}
          isEdit={!!profileEdit}
        />
      </DialogActions>
    </div>
  );
};

ProfilesListAddEditForm.propTypes = {
  countryId: PropTypes.string.isRequired,
  profileEdit: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onAddProfile: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  profilesLength: PropTypes.number.isRequired
};

export default ProfilesListAddEditForm;