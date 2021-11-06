import React, { useEffect, useCallback, useState, useContext } from 'react'
import { NotificationDetails } from './notificationDetails/NotificationDetails'
import Container from '../common/Container/Container';
import LoaderBackdrop from './../common/loader/LoaderBackdrop';
import NotificationServices from './../../services/NotificationServices';
import { showMessageAction } from '../../context/actions/message/messageAction';

import HomeContext from '../../context/HomeContext';


const NotificationsContainerDetails = props => {
    const { match,history } = props;
    const codeCountry = match.params.country;
    const notificacionId=match.params.notificacionId;
    const [toSendList, setToSendList] = useState([]);
    const [message, setMessage] = useState('');
    const [idUserSender,setIdUserSender]=useState('')
    const [statusNotification, setStatusNotification] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [hourAt, setHourAt] = useState('');
    const dispatch = useContext(HomeContext)[1];

    

     
    const showMessage = useCallback((type, message) => {
        dispatch(showMessageAction({ open: true, type, message }));
      }, [dispatch]);

   



    const getNotificationDetail = useCallback(async () => {
       
        const notificationServices = new NotificationServices();
        const response = await notificationServices.getNotificationDetail(codeCountry,notificacionId);
       
        if (response)
        {
     
        setToSendList(response.data.toSend)
        setMessage(response.data.message)
        setIdUserSender(response.data.idUserSender)
        setStatusNotification(response.data.status)
        let d = new Date(Date.parse(response.data.createdAt));
        setCreatedAt(d.toLocaleDateString());
        setHourAt(d.toLocaleTimeString())
        }
        else{
          
            showMessage('info', 'no existen detalles de la notificación');


        }





        
       // response = await getNotificationDetail(country,notification_id)

        
    }, [codeCountry]);


    useEffect(() => {
        getNotificationDetail();
      }, []);
    

    const [isLoading, setIsLoading] = useState(false);
    return (
        <React.Fragment>
      <Container
        applicationName="Notificaciones"
        titleApplications="Detalle de la notificación"
        
      >
        <NotificationDetails
         toSendList={toSendList}
         message={message} 
         statusNotification={statusNotification}
         idUserSender={idUserSender}
         createdAt={createdAt}
         hourAt={hourAt}
        />
      </Container>
      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
    )
}

export default NotificationsContainerDetails
