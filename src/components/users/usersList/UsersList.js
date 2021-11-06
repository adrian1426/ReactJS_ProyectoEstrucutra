import React, { useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import SubContainer from '../../common/Container/SubContainer';
import TabsNavUserProfile from '../../common/tabsNav/tabsNavUserProfile/TabsNavUserProfile';
import Table from '../../common/table/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import UsersListFilter from './UsersListFilter';
import Status from '../../common/status/Status';
import UserContext from '../../../context/UserContext';
import { useTranslation } from 'react-i18next';

const initialStateFilter = {
  status: null,
  profileId: null,
  dateStart: null,
  dateEnd: null
};

const UsersList = props => {
  const {
    data, onClickEditUser, onClickDeleteUser, activateDeactivateUser, profiles, codeCountry, isLoadingTable, showMessage
  } = props;
  const { state: userState } = useContext(UserContext);
  const [filters, setFilters] = useState(initialStateFilter);
  const isFiltered = (filters.dateEnd || filters.dateStart || filters.profileId || filters.status) !== null;
  const { t } = useTranslation('users');

  const columns = [
    { fieldId: 'email', label: t('list.email') },
    { fieldId: 'idUserEdit', label: t('list.idUserEdit') },
    { fieldId: 'profile', label: t('list.profile') },
    {
      fieldId: 'isActive', label: t('list.isActive'), render: rowData => {
        if (rowData.isActive) {
          return <Status title={t('list.active')} background='#106AC1' />;
        }
        return <Status title={t('list.inactive')} background='#9C9C9C' />;
      }
    },
    { fieldId: 'createdAt', label: t('list.createdAt') },
    { fieldId: 'updatedAt', label: t('list.updatedAt') },
    { fieldId: 'company', label: t('list.company') }
  ];

  const dataTableFilter = useMemo(() => {
    if (isFiltered) {
      return data.filter(item => {
        const fieldFilters = (filters.status !== undefined ? item.isActive === filters.status : item.isActive !== undefined)
          && (filters.profileId !== undefined ? item.profileId === filters.profileId : item.profileId !== undefined)
          && (filters.dateStart !== null ? item.createdAtTime >= filters.dateStart : item.createdAt !== undefined)
          && (filters.dateEnd !== null ? item.createdAtTime <= filters.dateEnd : item.createdAt !== undefined);

        return fieldFilters;
      });
    }
    return data;
  }, [data, isFiltered, filters]);

  const handleFilter = objFilter => {
    setFilters(objFilter);
  };

  const actions = row => (
    [
      {
        render: <Switch
          size="small"
          checked={row.isActive}
          onChange={() => activateDeactivateUser(row)}
        />
      },
      {
        Icon: EditIcon,
        tooltip: t('list.actionEdit'),
        onClick: onClickEditUser
      },
      {
        Icon: DeleteIcon,
        tooltip: t('list.actionDelete'),
        onClick: onClickDeleteUser
      }
    ]
  );

  const actionsTable = !userState.isReadOnly ? actions : null;

  useEffect(() => {
    if (isFiltered && dataTableFilter.length <= 0) {
      showMessage('warning', t('list.filterWarn'));
    }
  }, [isFiltered, dataTableFilter, showMessage, t]);

  return (
    <React.Fragment>
      <TabsNavUserProfile country={codeCountry} />

      <SubContainer>
        <UsersListFilter
          profiles={profiles}
          handleFilterUsers={handleFilter}
        />

        <Table
          columns={columns}
          data={dataTableFilter}
          dense={true}
          actionsMinWidth='130px'
          actions={actionsTable}
          isLoading={isLoadingTable}
        />
      </SubContainer>
    </React.Fragment>
  );
};

UsersList.propTypes = {
  data: PropTypes.array.isRequired,
  onClickEditUser: PropTypes.func.isRequired,
  onClickDeleteUser: PropTypes.func.isRequired,
  activateDeactivateUser: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  codeCountry: PropTypes.string.isRequired,
  isLoadingTable: PropTypes.bool.isRequired,
  showMessage: PropTypes.func.isRequired
};

export default UsersList;