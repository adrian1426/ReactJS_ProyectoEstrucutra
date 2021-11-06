import React from 'react';
import Table from '../../common/table/Table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import { notificationsDetailsBase } from '../../../constants/appRoutes';
import { useTranslation } from 'react-i18next';

const FormatDate = (i) => {
  let o = new Date(Date.parse(i));
  return o.toLocaleTimeString([], { timeStyle: 'short' });
};


const NotificationsListSend = props => {

  const {
    history, codeCountry, notificationsList, confirmCancelNotification, isLoadingTable, statusNotification
  } = props;
  const { t } = useTranslation('notificationsList');

  
  const redirectDetailsNotification = (notification) => {
    history.push(`/${notificationsDetailsBase}/${codeCountry}/${notification.id}`);
  };

  const columns = statusNotification === 'canceled' ? [
    { fieldId: 'createdAt', label: t('table.colCreationDate') },
    {
      fieldId: 'createdAtHour', label: t('table.colCreationHour'),
      render: (row) => {
        return FormatDate(row.createdAt + " " + row.createdAtHour);
      }
    },
    {
      fieldId: 'sentAt',
      label: t('table.colSendDate')

    },
    {
      fieldId: 'sentAtHour',
      label: t('table.colSendHour'),
      render: (row) => {
        return FormatDate(row.sentAt + " " + row.sentAtHour);
      }
    },
    { fieldId: 'idUserSender', label: t('table.colUser') },
    { fieldId: 'message', label: t('table.colMessage') },
    { fieldId: 'toSend', label: t('table.colTotalSenders') },
    { fieldId: 'canceledAt', label: t('table.colCancelDate') },
    {
      fieldId: 'canceledAtHour',
      label: t('table.colCancelHour'),
      render: (row) => {
        return FormatDate(row.canceledAt + " " + row.canceledAtHour);
      }


    }

  ] : [
      { fieldId: 'createdAt', label: t('table.colCreationDate') },
      {
        fieldId: 'createdAtHour',
        label: t('table.colCreationHour'),
        render: (row) => {
          return FormatDate(row.createdAt + " " + row.createdAtHour);
        }
      },
      {
        fieldId: 'sentAt',
        label: t('table.colSendDate')
      },
      {
        fieldId: 'sentAtHour',
        label: t('table.colSendHour'),
        render: (row) => {
          return FormatDate(row.sentAt + " " + row.sentAtHour);
        }
      },
      { fieldId: 'idUserSender', label: t('table.colUser') },
      { fieldId: 'message', label: t('table.colMessage') },
      { fieldId: 'toSend', label: t('table.colTotalSenders') },

    ];
  const actions = () => statusNotification === 'scheduled' ? (
    [
      {
        Icon: VisibilityIcon,
        tooltip: t('table.actionDetail'),
        onClick: redirectDetailsNotification
      },
      {
        Icon: CancelIcon,
        tooltip: t('table.actionCancel'),
        onClick: confirmCancelNotification
      }
    ]) : (
      [
        {
          Icon: VisibilityIcon,
          tooltip: t('table.actionDetail'),
          onClick: redirectDetailsNotification
        },

      ])







  return (
    <Table
      columns={columns}
      data={notificationsList}
      dense={true}
      actions={actions}
      isLoading={isLoadingTable}
      options={{
        paginationRows: [100, 500, 700],
        paginationRemote: true
      }}

    />
  );
};

export default NotificationsListSend;