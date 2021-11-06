import React from 'react';
import Styles from './EmployeesDetails.module.css';
import Table from '../../common/table/Table';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EmailIcon from '@material-ui/icons/Email';

const AdvancementTable = (props) => {
    const { advancements, onViewPayments, isLoadingTable } = props

    const columns = [
        { fieldId: 'id', label: 'No. de tansacción' },
        { fieldId: 'createdAt', label: 'Fecha solicitud' },
        { fieldId: 'approvedAmount', label: 'Monto solicitado' },
        { fieldId: 'interestRate', label: 'Tasa de interés' },
        { fieldId: 'comission', label: 'Comisiones' },
        { fieldId: 'balance', label: 'Saldo' },
        {
            fieldId: 'isActive', label: 'Status', render: rowData => {
                if (rowData.isActive) {
                    return 'Activo';
                }
                return 'Inactivo';
            }
        },
    ];

    const data = []
    const actions = () => (
        [
            {
                Icon: VisibilityIcon,
                tooltip: 'Ver Adelanto',
                onClick: onViewPayments
            },
            {
                Icon: EmailIcon,
                tooltip: 'Enviar contrato',
            },
        ])

    return (
        <div className={Styles.cardTable} >

            <Table
                title="Adelantos"
                columns={columns}
                data={advancements ? advancements : data}
                actions={actions}
                isLoading={isLoadingTable}
                backgroundActions={true}
                dense={true}
                fontSize='12px'
                size='small'
                options={{
                    pagination: false,
                    searchDefault: true,
                }}
            />


        </div>
    );
};

export default AdvancementTable;