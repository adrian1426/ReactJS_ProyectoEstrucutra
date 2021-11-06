import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Styles from './MenuAccordionSubMenuItem.module.css';

const useStyles = makeStyles((theme) => ({
  navSelected: {
    background: [theme.palette.secondary.main],
    color: [theme.palette.secondary.contrastText]
  }
}));

const MenuAccordionSubMenuItem = props => {
  const { subMenu, isMultiple } = props;
  const { i18n } = useTranslation();
  const codeLanguage = i18n.language.substring(0, 2);
  const styleButtom = isMultiple ? Styles.Buttom : `${Styles.Buttom} ${Styles.Buttom_MarginRight}`;
  const classes = useStyles();

  return (
    <ListItem
      button
      className={styleButtom}
      component={NavLink}
      activeClassName={classes.navSelected}
      to={subMenu.link}
    >
      <Icon>{subMenu.icon}</Icon>
      <Typography>
        {subMenu.title[codeLanguage]}
      </Typography>
    </ListItem>
  );
};


MenuAccordionSubMenuItem.propTypes = {
  subMenu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    title: PropTypes.objectOf(PropTypes.string).isRequired,
    icon: PropTypes.string,
    link: PropTypes.string,
    haveSubMenu: PropTypes.bool
  }).isRequired,
  isMultiple: PropTypes.bool.isRequired
};

export default MenuAccordionSubMenuItem;