import React from 'react';
import Table from '../../common/table/Table';


const columns = [
  
  { fieldId: 'company', label: 'Empresa' },
  { fieldId: 'status', label: 'Estatus' },
  { fieldId: 'id', label: 'Folio' },
  { fieldId: 'noEmployee', label: 'No. Empleado' },
  { fieldId: 'name', label: 'Nombre' },
  { fieldId: 'email', label: 'Correo' }
  
 
  
  
];

const data = [
  {company:'uber', id: 12345, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12346, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12347, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12348, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12349, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12350, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12351, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12352, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12353, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12354, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12355, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' },
  {company:'uber', id: 12356, name: 'Adrian Hernández', code: 234, noEmployee: 'ASS9FHaJSDSDSDS', email: 'adrian@gmail.com', status: 'Pendiente de firma', maxAmount: 34567, rfc: 'HEHA456789P12', payrollAmount: 345677, periodicity: 'Semanas', clabe: 4689202, enableCredit: 'Sí', creditAmount: 347891, instituteCode: 3471, isActive: 'Sí', createdAt: '10/10/2020' }
];

const NotificationsMassiveListUser = () => {
  
  return (
    <Table
      columns={columns}
      data={data}
      dense={true}
      options={{
        check: true
      }}      
    />
  );
};

export default NotificationsMassiveListUser;