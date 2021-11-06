import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Container from '../common/Container/Container';
import ProfilesList from './profilesList/ProfilesList';
import DialogContainer from '../common/dialog/dialogContainer/DialogContainer';
import ProfilesAddEditForm from './profilesList/ProfilesListAddEditForm';
import ProfilesContainerListOptions from './ProfilesContainerListOptions';
import HomeContext from '../../context/HomeContext';
import LoaderBackdrop from '../common/loader/LoaderBackdrop';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';
import { showMessageAction } from '../../context/actions/message/messageAction';
import { useTranslation } from 'react-i18next';
import RoleServices from '../../services/RoleServices';
import helpers from '../../helpers';

const ProfilesContainerList = props => {
  const { match } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [roles, setRoles] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [profileSelected, setProfileSelected] = useState(null);
  const dispatch = useContext(HomeContext)[1];
  const codeCountry = match.params.country;
  const { t } = useTranslation('userProfiles');
  const title = !profileSelected ? 'Agregar Perfil' : 'Editar Perfil';

  const showMessage = useCallback((type, message) => {
    dispatch(showMessageAction({ open: true, type, message }));
  }, [dispatch]);


  const rolesDataTransform = useMemo(() => (
    roles.map(item => {
      return {
        id: item.id,
        name: item.name,
        isReadOnly: item.isReadOnly,
        access: item.access,
        isActive: item.isActive,
        isDeleted: item.isDeleted,
        createdAt: helpers.formatDate(item.createdAt),
        updatedAt: helpers.formatDate(item.updatedAt),
        createdAtTime: new Date(item.createdAt).getTime(),
        isHR: item.isHR,
        isAdmin: item.isAdmin,
        order: item.order,
        menuAccess: item.menuAccess
      }
    })
  ), [roles])

  const handleOpenForm = () => {
    setProfileSelected(null)
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleOpenEditForm = profile => {
    setProfileSelected(profile);
    setOpenForm(true);
  };

  const confirmDeleteProfile = profile => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Eliminar Perfil',
        textSecundary: `¿Está seguro en dar de baja el perfil <b>${profile.name}</b>?`,
        actionConfirm: () => deleteProfile(profile)
      }
    ));

  };

  const confirmChangeStatus = profile => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Cambiar estado',
        textSecundary: `¿Está seguro de <b>${profile.isActive ? 'desactivar' : 'activar'}</b> el perfil <b>${profile.name}</b>?`,
        actionConfirm: () => changeStatusProfile(profile)
      }
    ));

  };

  const getRoles = useCallback(async () => {
    setIsLoadingTable(true);
    const roleServices = new RoleServices();
    const response = await roleServices.getRoles(codeCountry);

    if (response?.status === 200 && response?.data.length > 0) {
      const rolesActive = response.data.filter(rol => !rol.isDeleted);
      setRoles(rolesActive);
      setIsLoading(false);
      setIsLoadingTable(false);
    } else {
      setRoles([]);
      setIsLoading(false);
      setIsLoadingTable(false);
      showMessage('info', '¡No se encontró información de perfiles!');
    }
  }, [codeCountry, showMessage]);

  const addProfile = async profile => {
    const roleServices = new RoleServices();
    const response = await roleServices.addRol(profile, codeCountry);

    if (response?.status === 200) {
      getRoles();
      handleCloseForm();
      showMessage('success', 'Perfil agregado correctamente!');
    } else {
      showMessage('error', `Error: ${response?.data?.detail}`);
    }
  };

  const editProfile = async profile => {
    const roleServices = new RoleServices();
    const response = await roleServices.editRol(profile.id, profile, codeCountry);

    if (response?.status === 200) {
      getRoles();
      handleCloseForm();
      showMessage('success', 'Perfil actualizado correctamente!');
    } else {
      showMessage('error', `Error: ${response?.data?.detail}`);
    }
  };

  const deleteProfile = async profile => {
    const roleServices = new RoleServices();
    const response = await roleServices.deleteRol(profile.id, codeCountry);

    if (response?.status === 200) {
      getRoles();
      dispatch(hideConfirmationAction());
      showMessage('success', `¡Perfil eliminado correctamente!`);
    } else {
      showMessage('error', `Error: ${response?.data?.detail}`);
    }

  };

  const changeStatusProfile = async profile => {
    const dataRol = { isActive: !profile.isActive };
    const titleAction = profile.isActive ? 'desactivado' : 'activado';
    const roleServices = new RoleServices();
    const response = await roleServices.editRol(profile.id, dataRol, codeCountry);

    if (response?.status === 200) {
      getRoles();
      dispatch(hideConfirmationAction());
      showMessage('success', `¡Perfil ${titleAction} correctamente!`);
    } else {
      showMessage('error', `Error: ${response?.data?.detail}`);
    }
  };

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return (
    <React.Fragment>
      <Container
        applicationName={t('header.appName')}
        titleApplications={t('header.appTitle')}
        componentHeader={
          <ProfilesContainerListOptions
            handleOpenForm={handleOpenForm}
          />
        }
      >
        <ProfilesList
          codeCountry={codeCountry}
          data={rolesDataTransform}
          onClickEditProfile={handleOpenEditForm}
          onClickDeleteProfile={confirmDeleteProfile}
          onClickChangeStatus={confirmChangeStatus}
          showMessage={showMessage}
          isLoadingTable={isLoadingTable}
        />
      </Container>

      <DialogContainer
        open={openForm}
        handleClose={handleCloseForm}
        title={title}
      >
        <ProfilesAddEditForm
          onClose={handleCloseForm}
          onAddProfile={addProfile}
          onEditProfile={editProfile}
          profileEdit={profileSelected}
          countryId={codeCountry}
          profilesLength={roles.length}
        />
      </DialogContainer>

      <LoaderBackdrop open={isLoading} />
    </React.Fragment>
  );
};

ProfilesContainerList.propTypes = {
  match: PropTypes.object.isRequired,
};

export default ProfilesContainerList;