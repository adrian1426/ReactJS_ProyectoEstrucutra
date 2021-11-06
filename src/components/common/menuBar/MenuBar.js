import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuBarLogo from './MenuBarLogo';
import MenuBarButton from './MenuBarButton';
import MenuBarLocales from './MenuBarLocales';
import MenuBarUser from './MenuBarUser';
import MenuBarToolsMobile from './MenuBarToolsMobile';
import UserContext from '../../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const languages = [
  {
    code: 'es',
    actionCode: 'es_mx',
    language: 'Español'
  },
  {
    code: 'en',
    actionCode: 'en',
    language: 'English'
  },
  {
    code: 'pt',
    actionCode: 'pt',
    language: 'Portugués'
  }
];

const MenuBar = () => {
  const { state: usuariosState } = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>

          <MenuBarLogo />
          <MenuBarButton />
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <MenuBarLocales languages={languages} />
            <MenuBarUser user={usuariosState} />
          </div>

          <div className={classes.sectionMobile}>
            <MenuBarToolsMobile>
              <MenuBarUser user={usuariosState} />
              <div></div>
            </MenuBarToolsMobile>
          </div>

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
