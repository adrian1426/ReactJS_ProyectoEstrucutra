import React from 'react';

import Table from '../../common/table/Table';

const RequestsReportList = props => {
    const { creditList } = props;
    const columns = [
        {fieldId:'request_id', label:'ID'},
        {fieldId:'request_status', label:'Estatus'},
        {fieldId:'period', label:'Periodo solicitud'},
        {fieldId:'register_date', label:'Fecha registro'},
        {fieldId:'employee', label:'Empleado'},
        {fieldId:'employeeStatus', label:'Estatus empleado'},
        {fieldId:'company', label:'Empresa'},
        {fieldId:'payroll_number', label:'Número de nómina'},
        {fieldId:'clabe', label:'Cuenta clabe'},
        {fieldId:'bontu_amount', label:'Monto bontu'},
        {fieldId:'total_amount', label:'Monto total'},
        {fieldId:'commission', label:'Comisión'},
        {fieldId:'rfc', label:'RFC/Cédula'},
        {fieldId:'contracting_date', label:'Fecha contrato'},
        {fieldId:'amount_requested', label:'Monto solicitado'},
        {fieldId:'balance', label:'Saldo insoluto'},
        {fieldId:'total_paid', label:'Total pagado'},
        {fieldId:'comission_percent', label:'Porcentaje de comisión'},
        {fieldId:'interest_rate', label:'Tasa de interés'},
        {fieldId:'term', label:'Plazo'},
        {fieldId:'retention_percent', label:'Porcentaje de retención'},
        {fieldId:'credit_product', label:'Producto crediticio'},
        {fieldId:'cat', label:'CAT sin IVA'},
        {fieldId:'product_credit_id', label:'Producto crediticio ID'},
    ];
    return (
        <div>
            <Table
                columns={columns}
                data={creditList}
            />
        </div>
    );
};

export default RequestsReportList;