import React from 'react';
import TabsNav from '../TabsNav';
import { notificationsListBase } from '../../../../constants/appRoutes';
import { notificationProgram, notificationSend, notificationCancel } from '../../../../constants/catalogs';

const TabsNavNotifications = props => {
  const { country, selectDefault } = props;

  const tabsMenu = [
    {
      link: `/${notificationsListBase}/${country}/${notificationProgram}`,
      title: 'Programadas',
      selectDefault: selectDefault
    },
    {
      link: `/${notificationsListBase}/${country}/${notificationSend}`,
      title: 'Enviadas'
    },
    {
      link: `/${notificationsListBase}/${country}/${notificationCancel}`,
      title: 'Canceladas'
    }
  ];

  return (
    <TabsNav tabsMenu={tabsMenu} />
  );
};

export default TabsNavNotifications;