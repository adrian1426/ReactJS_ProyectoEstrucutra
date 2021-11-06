import React from 'react';
import TabsNav from '../../common/tabsNav/TabsNav';
import { TAB_PENDING, TAB_APPROVED, TAB_DISMISSED } from '../../../constants/catalogs';
import { visaBase } from '../../../constants/appRoutes';
const VisaNavTabs = props => {
  const { country, selectedDefault } = props;
  const menuTabs = [
    {
      link: `/${visaBase}/${country}/${TAB_PENDING}`,
      title: 'Pendientes',
      selectDefault: selectedDefault
    },
    {
      link: `/${visaBase}/${country}/${TAB_APPROVED}`,
      title: 'Aprobadas',
    },
    {
      link: `/${visaBase}/${country}/${TAB_DISMISSED}`,
      title: 'Rechazadas'
    }
  ];
  return (
    <TabsNav tabsMenu={menuTabs} />
  );
};

export default VisaNavTabs;