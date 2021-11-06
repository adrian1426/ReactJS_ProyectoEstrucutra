import React from 'react';
import SubContainer from '../../common/Container/SubContainer';
import Table from '../../common/table/Table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { companiesFormBase } from '../../../constants/appRoutes';

const columns = [
    { fieldId: 'name', label: 'Nombre' },
    { fieldId: 'code', label: 'Código' },
    {
        fieldId: 'isActive', label: 'Activo', render: rowData => {
            if (rowData.isActive) {
                return 'Sí';
            }
            return 'No';
        }
    },
    {
        fieldId: 'isDeleted', label: 'Borrado', render: rowData => {
            if (rowData.isDeleted) {
                return 'Si';
            }
            return 'No';
        }
    },
    { fieldId: 'createdAt', label: 'Creación' },
    { fieldId: 'updatedAt', label: 'Modificación' },
    { fieldId: 'createdAmountAt', label: 'Carga Montos Fecha' },
    { fieldId: 'createdAmountUser', label: 'Carga Montos Usuario' },

];

const CompaniesList = props => {
    const { companiesDataTable, onDeleteCompany, history, codeCountry, isLoadingTable } = props;

    const onEditCompany = company => {
        history.push(`/${companiesFormBase}/${codeCountry}/${company.id}`)
    };

    const actions = () => (
        [

            {
                Icon: EditIcon,
                tooltip: 'Editar',
                onClick: onEditCompany
            },
            {
                Icon: DeleteIcon,
                tooltip: 'Eliminar empresa',
                onClick: onDeleteCompany
            }
        ]
    );

    return (
        <SubContainer>
            <Table
                columns={columns}
                data={companiesDataTable}
                dense={true}
                actions={actions}
                isLoading={isLoadingTable}
            />
        </SubContainer>
    );
};

export default CompaniesList;