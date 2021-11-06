import React, { useState, useEffect, useCallback, useContext } from 'react';

import Container from '../common/Container/Container';
import TabsNavNotifications from '../common/tabsNav/tabsNavNotifications/TabsNavNotifications';
import SubContainer from '../common/Container/SubContainer';
import NotificationList from './notificationsList/NotificationsList';
import { notificationProgram } from '../../constants/catalogs';
import NotificationServices from './../../services/NotificationServices';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { useTranslation } from 'react-i18next';
import HomeContext from '../../context/HomeContext';
import UserContext from '../../context/UserContext';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';


const pageSizeFirst = 100;




const NotificationsContainerList = props => {
  const { match, history } = props;
  const [notificationsList, setNotificationsList] = useState([]);
  const [pageSizeTable, setPageSizeTable] = useState(100);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [filtersTable, setFiltersTable] = useState(null);
  const codeCountry = match.params.country;
  const statusNotification = match.params.statusId || notificationProgram;
  const selectDefaultProgram = match.params.statusId ? false : true;
  const dispatch = useContext(HomeContext)[1];
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('notificationsList');



  const { state: userState } = useContext(UserContext);


  const confirmCancelNotification = data => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Cancelar notificación',
        textSecundary: '¿Esta seguro que desea cancelar esta notificación',
        actionConfirm: () => cancelNotification(data)
      }
    ));
  };

  const cancelNotification = async data => {
    dispatch(hideConfirmationAction());
    const notificationServices = new NotificationServices();
    const response = await notificationServices.cancelNotification(codeCountry, data.id, userState.id);


    if (response?.status === 200) {
      showMessage('success', "La notificación fue cancelada correctamente");

    }
    else {
    
      showMessage('error', response?.data.detail);
    }

   

  };



  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const addFilterTable = (filterInfo) => {
    setFiltersTable(filterInfo);
  };

  const getNotifications = useCallback(async (pageSize = pageSizeFirst) => {
    setIsLoading(true);

    const notificationServices = new NotificationServices();
    const response = await notificationServices.getNotifications(codeCountry, statusNotification);

    if (response?.status === 200 && response.data.length > 0) {
      console.log('respuesta', response)
      setNotificationsList(response.data)


    } else {

      setNotificationsList([])

    }
    setIsLoading(false);

  }, [codeCountry, statusNotification]);

  const getNotificationsFilter = useCallback(async (pageSize, actionPage) => {
    setIsLoadingTable(true);
    setIsLoading(true);

    setPageSizeTable(pageSize);

    const valPrev = (notificationsList.length - pageSize) >= 0 ? notificationsList.length - pageSize : 0;
    const valNext = notificationsList.length - 1;
    const prevId = actionPage === 'PREV' && { prevDocument: notificationsList[valPrev]?.id };
    const nextId = actionPage === 'NEXT' && { nextDocument: notificationsList[valNext]?.id };
    const filters = filtersTable !== null && filtersTable;
    const code = { country: codeCountry }
    const status = { status: statusNotification }

    
    const body = {
      ...filters.filters,
      ...prevId,
      ...nextId,
      ...code,
      ...status
    };
    const paramsString = new URLSearchParams(body).toString()

  

    const notificationServices = new NotificationServices();
    const response = await notificationServices.getNotificationsFilter(paramsString);

    if (response?.status === 200 && response.data.length > 0) {
    
      setNotificationsList(response.data)


    } else {

      setNotificationsList([])

    }


   
    setIsLoading(false);
    setIsLoadingTable(false);



  }, [codeCountry, notificationsList, filtersTable, getNotifications, showMessage]);


  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  useEffect(() => {
    if (filtersTable && !isFiltered) {
      setIsFiltered(true);
      getNotificationsFilter(pageSizeTable, null);
    }
  }, [filtersTable, getNotificationsFilter, pageSizeTable, isFiltered]);

  return (
    <Container
      applicationName={t('header.appName')}
      titleApplications={t('header.appTitle')}
    >
      <React.Fragment>
        <TabsNavNotifications
          country={codeCountry}
          selectDefault={selectDefaultProgram}
        />

        <SubContainer>
          <NotificationList
            statusNotification={statusNotification}
            history={history}
            codeCountry={codeCountry}
            notificationsList={notificationsList}
            pageSizeTable={pageSizeTable}
            getNotifications={getNotifications}
            addFilterTable={addFilterTable}
            setIsFiltered={setIsFiltered}
            confirmCancelNotification={confirmCancelNotification}
            isLoadingTable={isLoadingTable}

          />
        </SubContainer>
        <LoaderBackdrop open={isLoading} />
      </React.Fragment>
    </Container>
  );
};

export default NotificationsContainerList;