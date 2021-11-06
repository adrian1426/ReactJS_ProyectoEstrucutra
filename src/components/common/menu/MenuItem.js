import React from 'react';
import PropTypes from 'prop-types';
import Buttom from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Styles from './MenuItem.module.css';

const MenuItem = props => {
  const { isMultiple, selected, menu, handleMenuItemClick } = props;
  const { i18n } = useTranslation();
  const codeLanguage = i18n.language.substring(0, 2);

  const styleButtomMargin = isMultiple ? Styles.Buttom : `${Styles.Buttom} ${Styles.Buttom_MarginRight}`;
  const colorButtom = selected ? 'secondary' : 'primary';
  const variantButtom = selected ? 'contained' : null;
  const styleFinal = selected ? styleButtomMargin : `${styleButtomMargin} ${Styles.Buttom_Opacity}`;

  return (
    <Buttom
      className={styleFinal}
      color={colorButtom}
      variant={variantButtom}
      onClick={handleMenuItemClick}
    >
      <div className={Styles.Buttom_Content}>
        <Icon fontSize='large'>
          {menu.icon}
        </Icon>
        <Typography className={Styles.Buttom_Content_Typography}>
          {menu.title[codeLanguage]}
        </Typography>
      </div>
    </Buttom>
  );
};

MenuItem.propTypes = {
  isMultiple: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  menu: PropTypes.shape({
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    title: PropTypes.objectOf(PropTypes.string).isRequired,
    icon: PropTypes.string,
    link: PropTypes.string,
    haveSubMenu: PropTypes.bool
  }).isRequired,
  handleMenuItemClick: PropTypes.func.isRequired
};

export default MenuItem;