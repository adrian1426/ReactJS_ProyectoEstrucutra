import React from 'react';

import NotificationsListSend from '../notificationsList/NotificationsListSend';

import NotificationsListFilter from './NotificationsListFilter';

const NotificationsList = props => {
  const { statusNotification, history, codeCountry, notificationsList, pageSizeTable, getNotifications,
    addFilterTable, setIsFiltered, confirmCancelNotification,isLoadingTable } = props;

  const componentListNotification = () => {
   
         return (
          <React.Fragment>
            <NotificationsListFilter             
              statusNotification={statusNotification}
              pageSizeTable={pageSizeTable}
              getNotifications={getNotifications}
              addFilterTable={addFilterTable}
              setIsFiltered={setIsFiltered}
            />
            <NotificationsListSend
              statusNotification={statusNotification}
              history={history} 
              codeCountry={codeCountry}
               notificationsList={notificationsList}
               confirmCancelNotification={confirmCancelNotification} 
               isLoadingTable={isLoadingTable}/>
          </React.Fragment>
        );
  
  };

  return (
    <React.Fragment>
      {componentListNotification()}
    </React.Fragment>
  );
};

export default NotificationsList;