import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import Container from '../common/Container/Container';
import UsersContainerListOptions from './UsersContainerListOptions';
import UsersList from './usersList/UsersList';
import DialogContainer from '../common/dialog/dialogContainer/DialogContainer';
import UsersListAddEditForm from './usersList/UsersListAddEditForm';
import LoaderBackdrop from '../common/loader/LoaderBackdrop';
import HomeContext from '../../context/HomeContext';
import UserContext from '../../context/UserContext';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { useTranslation } from 'react-i18next';
import UserServices from './../../services/UserServices';
import RoleServices from './../../services/RoleServices';
import CompanyServices from '../../services/CompanyServices';
import { refsCompany, refsRole, refsUser } from '../../constants/refsCollection';
import helpers from '../../helpers';

const companyRef = user => (
  user.type?.isHR && { companyRef: `${refsCompany}/${user.company?.id}` }
);

const roleRef = idRole => (
  { roleRefs: [`${refsRole}/${idRole}`] }
);

const userTransform = user => {
  const userData = {
    email: user.email,
    isActive: user.isActive,
    ...roleRef(user.type.id),
    ...companyRef(user)
  };
  return userData;
};

const UsersContainerList = props => {
  const { match } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const dispatch = useContext(HomeContext)[1];
  const { state: userState } = useContext(UserContext);
  const { t } = useTranslation('users');
  const codeCountry = match.params.country;
  const title = !userSelected ? 'Agregar Usuario' : 'Editar Usuario';

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);

  const usersData = useMemo(() => (
    users.map(item => {
      const rol = item?.roleRefs?.filter(r => r.isAdmin === true)[0];
      return {
        id: item.id,
        email: item.email,
        isActive: item.isActive,
        idUserEdit: item.userEditRef?.email,
        profileId: rol?.id,
        profile: rol?.name,
        companyId: item.companyRef?.id,
        company: item.companyRef?.businessName,
        createdAt: helpers.formatDate(item.createdAt),
        createdAtTime: new Date(item.createdAt).getTime(),
        updatedAt: helpers.formatDate(item.updatedAt)
      };
    })
  ), [users]);

  const handleOpenForm = () => {
    setUserSelected(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenEditForm = user => {
    setUserSelected(user);
    setOpenForm(true);
  };

  const confirmDeleteUser = user => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Eliminar Usuario',
        textSecundary: `¿Está seguro en dar de baja a <b>${user.email}</b>?`,
        actionConfirm: () => deleteUser(user)
      }
    ));
  };

  const confirmActivateDeactivate = user => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: `${user.isActive ? 'Desactivar Usuario' : 'Activar Usuario'}`,
        textSecundary: `¿Está seguro en ${user.isActive ? 'desactivar a' : 'activar a'} <b>${user.email}</b>?`,
        actionConfirm: () => activateDeactivateUser(user)
      }
    ));
  };

  const getRoles = useCallback(async () => {
    const roleServices = new RoleServices();
    const response = await roleServices.getRoles(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      const rolesActive = response.data.filter(rol => rol.isActive);
      setRoles(rolesActive);
    } else {
      setRoles([]);
    }
  }, [codeCountry]);

  const getCompanies = useCallback(async () => {
    const companyServices = new CompanyServices();
    const response = await companyServices.getCompanies(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      const companiesActive = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
      setCompanies(companiesActive);
    } else {
      setCompanies([]);
    }
  }, [codeCountry]);

  const getUsers = useCallback(async () => {
    setIsLoadingTable(true);
    const userServices = new UserServices();
    const response = await userServices.getUsers(codeCountry);

    if (response?.status === 200 && response.data.length > 0) {
      setUsers(response.data);
      setIsLoading(false);
      setIsLoadingTable(false);
    } else {
      setUsers([]);
      setIsLoading(false);
      setIsLoadingTable(false);
      showMessage('info', '¡No se encontró información de usuarios!');
    }
  }, [codeCountry, showMessage]);

  const addUser = async user => {
    const userData = userTransform(user);
    const userServices = new UserServices();
    const response = await userServices.addUser(userData);

    if (response?.status === 200) {
      getUsers();
      handleCloseForm();
      showMessage('success', '¡Usuario agregado correctamente!');
    } else {
      showMessage('error', `Error: ${response?.error?.detail}`);
    }
  };

  const editUser = async user => {
    const userData = { ...userTransform(user), userEditRef: `${refsUser}/${userState.id}` };
    const userServices = new UserServices();
    const response = await userServices.editUser(user.id, userData);

    if (response?.status === 200) {
      getUsers();
      handleCloseForm();
      showMessage('success', '¡Usuario actualizado correctamente!');
    } else {
      showMessage('error', `Error: ${response?.error?.detail}`);
    }
  };

  const activateDeactivateUser = async user => {
    const dataUser = { isActive: !user.isActive, userEditRef: `${refsUser}/${userState.id}` };
    const titleAction = user.isActive ? 'desactivado' : 'activado';
    const userServices = new UserServices();
    const response = await userServices.editUser(user.id, dataUser);

    if (response?.status === 200) {
      getUsers();
      dispatch(hideConfirmationAction());
      showMessage('success', `¡Usuario ${titleAction} correctamente!`);
    } else {
      showMessage('error', `Error: ${response?.error?.detail}`);
    }
  };

  const deleteUser = async user => {
    const dataUser = { isDeleted: true, userEditRef: `${refsUser}/${userState.id}` };
    const userServices = new UserServices();
    const response = await userServices.editUser(user.id, dataUser);

    if (response?.status === 200) {
      getUsers();
      dispatch(hideConfirmationAction());
      showMessage('success', `¡Usuario eliminado correctamente!`);
    } else {
      showMessage('error', `Error: ${response?.error?.detail}`);
    }
  };

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <React.Fragment>
      <Container
        applicationName={t('header.appName')}
        titleApplications={t('header.appTitle')}
        componentHeader={
          <UsersContainerListOptions
            handleOpenForm={handleOpenForm}
          />
        }
      >
        <UsersList
          codeCountry={codeCountry}
          data={usersData}
          onClickEditUser={handleOpenEditForm}
          onClickDeleteUser={confirmDeleteUser}
          activateDeactivateUser={confirmActivateDeactivate}
          profiles={roles}
          isLoadingTable={isLoadingTable}
          showMessage={showMessage}
        />
      </Container>

      <DialogContainer
        open={openForm}
        title={title}
        handleClose={handleCloseForm}
      >
        <UsersListAddEditForm
          onClose={handleCloseForm}
          companies={companies}
          types={roles}
          onAddUser={addUser}
          onEditUser={editUser}
          userEdit={userSelected}
        />
      </DialogContainer>

      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

export default UsersContainerList;