import React from 'react';
import PropTypes from 'prop-types';
import TabsNav from '../TabsNav';
import { useTranslation } from 'react-i18next';
import { usersListBase, profilesListBase } from '../../../../constants/appRoutes';

const TabsNavUserProfile = props => {
  const { country } = props;
  const labelCountry = country.toUpperCase();
  const { t } = useTranslation('navUserProfile');

  const tabsMenu = [
    {
      link: `/${usersListBase}/${country}`,
      title: t('navUser')
    },
    {
      link: `/${profilesListBase}/${country}`,
      title: t('navProfile', { country: labelCountry })
    }
  ];

  return (
    <TabsNav tabsMenu={tabsMenu} />
  );
};

TabsNavUserProfile.propTypes = {
  country: PropTypes.string.isRequired
};

export default TabsNavUserProfile;