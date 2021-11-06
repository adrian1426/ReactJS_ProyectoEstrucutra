import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import SubContainer from './../../common/Container/SubContainer';
import TabsNavUserProfile from './../../common/tabsNav/tabsNavUserProfile/TabsNavUserProfile';
import Table from '../../common/table/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import ProfilesListFilters from './ProfilesListFilters';
import Status from '../../common/status/Status';

const initialStateFilter = {
  status: null,
  rol: null,
  access: null,
  dateStart: null,
  dateEnd: null
};

const ProfilesList = (props) => {
  const { data, onClickEditProfile, onClickDeleteProfile, onClickChangeStatus, codeCountry, showMessage, isLoadingTable } = props;
  const [filters, setFilters] = useState(initialStateFilter);
  const isFiltered = (filters.access || filters.dateEnd || filters.dateStart || filters.status || filters.rol) !== null;

  const columns = [
    { fieldId: 'name', label: 'Nombre del Perfil' },
    {
      fieldId: 'isReadOnly', label: 'Rol', render: rowData => {
        if (rowData.isReadOnly) {
          return 'Lectura';
        }
        return 'Escritura';
      }
    },
    { fieldId: 'access', label: 'Accesos' },
    {
      fieldId: 'isActive', label: 'Estatus', render: rowData => {
        if (rowData.isActive) {
          return <Status title='Activo' background='#106AC1' />;
        }
        return <Status title='Inactivo' background='#9C9C9C' />;
      }
    },
    { fieldId: 'createdAt', label: 'Fecha de Creación' },
    { fieldId: 'updatedAt', label: 'Fecha de Modificación' },
  ];

  const dataTableFilter = useMemo(() => {
    if (isFiltered) {
      return data.filter(item => {
        const fieldFilters = (filters.status !== undefined ? item.isActive === filters.status : item.isActive !== undefined)
          && (filters.rol !== undefined ? item.isReadOnly === filters.rol : item.isReadOnly !== undefined)
          && (filters.access !== undefined ? item.access === filters.access : item.access !== undefined)
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

  const actions = (row) => (
    [
      {
        render: <Switch
          size="small"
          checked={row.isActive}
          onChange={() => onClickChangeStatus(row)}
        />
      },
      {
        Icon: EditIcon,
        tooltip: 'Editar',
        onClick: onClickEditProfile
      },
      {
        Icon: DeleteIcon,
        tooltip: 'Baja de perfil',
        onClick: onClickDeleteProfile
      }
    ]
  );

  useEffect(() => {
    if (isFiltered && dataTableFilter.length <= 0) {
      showMessage('warning', 'No se encontraron datos con los filtros seleccionados');
    }
  }, [isFiltered, dataTableFilter, showMessage]);


  return (
    <React.Fragment>
      <TabsNavUserProfile country={codeCountry} />

      <SubContainer>
        <ProfilesListFilters
          handleFilterProfiles={handleFilter}
        />

        <Table
          columns={columns}
          data={dataTableFilter}
          isLoading={isLoadingTable}
          actions={actions}
        />
      </SubContainer>
    </React.Fragment>
  );
};

ProfilesList.propTypes = {
  data: PropTypes.array.isRequired,
  onClickEditProfile: PropTypes.func.isRequired,
  onClickDeleteProfile: PropTypes.func.isRequired,
  onClickChangeStatus: PropTypes.func.isRequired,
  codeCountry: PropTypes.string.isRequired,
  showMessage: PropTypes.func.isRequired,
  isLoadingTable: PropTypes.bool.isRequired
};

export default ProfilesList;