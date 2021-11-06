import axios from 'axios';



class NotificationServices {

  

    

  constructor() {
    if (!!NotificationServices.instance) {
      return NotificationServices.instance;
    }

    NotificationServices.instance = this;

    return this;
  }

  
  apiNotification = `${process.env.REACT_APP_WALLET_WEB_ADMIN}/business-rules/notifications`;


  cancelNotification = async (country,notification_id, idSender) => {

    try {
        const data = {data:{idUserEdit: idSender}};
        const response = await axios({ method: 'DELETE', url: `${this.apiNotification}/${notification_id}?country=${country}`, data });
        return response;
      } catch (error) {
        return error.response;
      }
   
   

    
  };
 
  getNotifications = async (country,status) => {
    try {
      const response = await axios.get(`${this.apiNotification}/?country=${country}&status=${status}`, { });        

      return response;
    } catch (error) {
      return error.response;
    }
  };
  getNotificationsFilter=async(paramsString)=>{
    try {
        const response = await axios.get(`${this.apiNotification}/?limit=100&skip=0&${paramsString}`, { });        
  
        return response;
      } catch (error) {
        return error.response;
      }
  };

  getNotificationDetail = async (country,notification_id) => {
    try {
      const response = await axios.get(`${this.apiNotification}/${notification_id}?country=${country}`, { });        

      return response;
    } catch (error) {
      return error.response;
    }
  };

  
}
export default NotificationServices;