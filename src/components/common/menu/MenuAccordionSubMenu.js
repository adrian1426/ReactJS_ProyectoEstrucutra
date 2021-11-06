import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import SubMenuItem from './MenuAccordionSubMenuItem';
import helpers from '../../../helpers';
import Styles from './MenuAccordionSubMenu.module.css';

const divisorMultiple = 5;

const MenuAccordionSubMenu = props => {
  const { open, showDivider, subMenus } = props;

  const styleDivider = showDivider ? Styles.ContainerSubMenu_ShowDivider : Styles.ContainerSubMenu_HideDivider;
  const styleHeight = open ? Styles.ContainerSubMenu_HeightAuto : '';
  const styleContainer = `${Styles.ContainerSubMenu} ${styleDivider} ${styleHeight}`;
  const timeoutCollapse = open ? 450 : 0;
  const heightCollapse = showDivider ? '11px' : '0px';

  return (
    <div className={styleContainer}>
      <Collapse
        in={open}
        timeout={timeoutCollapse}
        collapsedHeight={heightCollapse}
      >
        <div className={Styles.ContainerSubMenu_Items}>
          {
            subMenus.map((item, i) => {
              const isMultiple = helpers.isMultiple((i + 1), divisorMultiple);
              const showDiv = isMultiple && (subMenus.length > divisorMultiple);

              return (
                <React.Fragment key={item.id}>
                  <SubMenuItem
                    key={item.id}
                    subMenu={item}
                    isMultiple={isMultiple}
                  />

                  {showDiv && <div className={Styles.ContainerSubMenu_Items_Divider}></div>}
                </React.Fragment>
              )
            })
          }
        </div>
      </Collapse>
    </div>
  );
};

MenuAccordionSubMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  showDivider: PropTypes.bool.isRequired,
  subMenus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      parentId: PropTypes.number.isRequired,
      title: PropTypes.objectOf(PropTypes.string).isRequired,
      icon: PropTypes.string,
      link: PropTypes.string,
      haveSubMenu: PropTypes.bool
    })
  ).isRequired,
};

export default MenuAccordionSubMenu;