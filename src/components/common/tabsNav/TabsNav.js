import React from 'react';
import PropTypes from 'prop-types';
import TabsNavItem from './TabsNavItem';

const styles = {
  options: {
    display: 'flex',
    marginBottom: '32px',
    marginTop: '-32px'
  }
};

const TabsNav = props => {
  const { tabsMenu } = props;

  return (
    <div style={styles.options}>
      {
        tabsMenu.map(item => (
          <TabsNavItem
            key={item.link}
            link={item.link}
            title={item.title}
            selectDefault={item.selectDefault}
          />
        ))
      }
    </div>
  );
};

TabsNav.propTypes = {
  tabsMenu: PropTypes.array.isRequired
};

export default TabsNav;