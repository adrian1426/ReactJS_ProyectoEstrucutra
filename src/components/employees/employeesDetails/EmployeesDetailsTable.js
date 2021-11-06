import React from 'react';
import Table from '../../common/table/Table';
const EmployeesDetailsTable = (props) => {
    const { payments, isLoadingTable } = props

    const columns = [
        { fieldId: 'createdAt', label: 'Fecha de movimiento' },
        { fieldId: 'folio', label: 'Folio Aplicación' },
        { fieldId: 'amount', label: 'Monto' },
        { fieldId: 'capitalPayments', label: 'Capital' },
        { fieldId: 'interestPayments', label: 'Interés' },
        { fieldId: 'ivaPayments', label: 'IVA' },
        { fieldId: 'commissions', label: 'Comisiones' },
        { fieldId: 'movementType', label: 'Tipo de Movimiento' },
        { fieldId: 'id', label: 'No.de Transacción' },
        { fieldId: 'status', label: 'Estatus' },
    ];
    const data = [
        { transactionNumber: "", requestAmount: '' }]

    return (
        <React.Fragment>
            <Table
                columns={columns}
                data={payments ? payments : data}
                dense={true}
                isLoading={isLoadingTable}
            />
        </React.Fragment>
    );
};

export default EmployeesDetailsTable;