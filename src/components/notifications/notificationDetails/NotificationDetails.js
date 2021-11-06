import React from 'react';
import Subcontainer from '../../common/Container/SubContainer';

import Grid from '@material-ui/core/Grid';
import Styles from './NotificationDetails.module.css';

import Table from '../../common/table/Table';
import { makeStyles } from '@material-ui/core/styles';
import TodayIcon from '@material-ui/icons/Today';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import MessageIcon from '@material-ui/icons/Message';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';

const columns = [


    { fieldId: 'id', label: 'Empleado ID' },
    { fieldId: 'name', label: 'Empleado' },
    { fieldId: 'emailWork', label: 'Correo' }



];

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    label: {
      padding: theme.spacing(2),
      textAlign: 'center'
     
    },
  }));


export const NotificationDetails = props => {
    const { toSendList, message, statusNotification, idUserSender, createdAt, hourAt } = props;
    const classes = useStyles();
    return (
        <Subcontainer>
            <div className={classes.root}>
                <Grid container spacing={3} className={Styles.formContainer}>
                    <Grid item xs={12}>                        
                        <label><b><TodayIcon fontSize="inherit" />  &nbsp;Fecha de creación:  &nbsp; </b>{createdAt}</label>                   
                        
                    </Grid>
                    <Grid item xs={12}>
                        <label><ScheduleIcon fontSize="inherit" /><b> &nbsp;Hora: &nbsp; </b>{hourAt}</label>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <label ><PersonIcon fontSize="inherit"/><b> &nbsp;Enviada por:  &nbsp; </b> {idUserSender}</label>
                                        
                    </Grid>
                    <Grid item xs={12}>
                        <label><b><AssignmentIcon  fontSize="inherit"/>&nbsp; Estatus:  &nbsp;</b> {statusNotification} </label>
                      
                    </Grid>
                    <Grid item xs={12}> 
                        <label> <MessageIcon fontSize="inherit"/><b> &nbsp;Mensaje enviado:  &nbsp;</b> {message}</label>                      
                    </Grid>
                   
                    <Grid item xs={12}>
                    <label> <PeopleIcon fontSize="inherit"/><b> &nbsp;Destinatarios:</b></label>
                    <Table
                        columns={columns}
                        data={toSendList}
                        dense={true}
                    />
                </Grid>
                </Grid>              

            </div>
        </Subcontainer>
    )
}
