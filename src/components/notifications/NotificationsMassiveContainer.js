import React, { useState } from 'react';
import Container from '../common/Container/Container';
import SubContainer from './../common/Container/SubContainer';
import NotificationsMassiveListUserFilter  from './notificationMassive/NotificationsMassiveListUserFilter'
import NotificationsMassiveListUser from './notificationMassive/NotificationsMassiveListUser'
import NotificationsMassiveSchedule from './notificationMassive/NotificationsMassiveSchedule'


const NotificationsMassiveContainer = () => {
  const [companies, setCompanies] = useState([]);

  return (
    <Container
      applicationName='Notificaciones'
      titleApplications='Notificaciones Masivas'
    >
      <div style={{ background: '#FFF', marginBottom: '30px', paddingBottom: '70px',borderRadius:'20px' }} justify>
        <NotificationsMassiveSchedule />
        </div>
      <SubContainer>
        <NotificationsMassiveListUserFilter  companies={companies}/>
        <NotificationsMassiveListUser/>
      </SubContainer>
    </Container>
  );
};

export default NotificationsMassiveContainer;