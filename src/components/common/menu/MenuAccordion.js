import React from 'react';
import PropTypes from 'prop-types';
import MenuAccordionSubMenu from './MenuAccordionSubMenu';

const MenuAccordion = props => {
  const { index, rowAccordionOpen, openRowAccordion, isMultiple, subMenus, menuLength, divisorMultiple } = props;
  const openRowSubMenu = rowAccordionOpen === openRowAccordion;
  const propsSubMenu = {
    open: openRowSubMenu,
    subMenus: subMenus
  };

  if (menuLength > divisorMultiple && isMultiple) {
    return <MenuAccordionSubMenu {...propsSubMenu} showDivider={true} />;

  } else if ((menuLength - 1) === index) {
    return <MenuAccordionSubMenu {...propsSubMenu} showDivider={false} />;
  }

  return null;
};

MenuAccordion.propTypes = {
  index: PropTypes.number.isRequired,
  rowAccordionOpen: PropTypes.number.isRequired,
  openRowAccordion: PropTypes.number.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  subMenus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      parentId: PropTypes.number.isRequired,
      title: PropTypes.objectOf(PropTypes.string).isRequired,
      icon: PropTypes.string,
      link: PropTypes.string,
      haveSubMenu: PropTypes.bool
    })
  ),
  menuLength: PropTypes.number.isRequired,
  divisorMultiple: PropTypes.number.isRequired
};

export default MenuAccordion;