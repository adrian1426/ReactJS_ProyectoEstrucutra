//Component - ProductsFormCommissionsAdd
export const collectMoments = [
  { id: 1, moment: 'Periodo vigente' },
  { id: 2, moment: 'Periodo vencido' },
  { id: 3, moment: 'Periodo complementario' },
  { id: 4, moment: 'Desembolso' }
];

export const fixedVariable = [
  { id: 1, type: 'Fijo' },
  { id: 2, type: 'Variable' }
];

export const drivers = [
  { id: 1, driver: 'Monto inicial' },
  { id: 2, driver: 'N/A' },
  { id: 3, driver: 'Saldo actual' },
  { id: 4, driver: 'Monto en mora' }
];

export const confirmations = [
  { id: 1, value: true, label: 'Sí', labelActive: 'Activo', labelRol: 'Lectura' },
  { id: 2, value: false, label: 'No', labelActive: 'Inactivo', labelRol: 'Escritura' }
];

//Component - ProductsForm - CompaniesForm
export const periodicity = [
  { id: '4KnlEouj2qKRWvFRppal', name: 'semanas', daysPeriod: 7 },
  { id: 'zdwKOHU1yggKKz3COIEg', name: 'catorcenas', daysPeriod: 14 },
  { id: 'IyaCTb0C3oFFjKNfrJHm', name: 'quincenas', daysPeriod: 15 },
  { id: 'Cb8xC2ruikQ6hxnhIhod', name: 'meses', daysPeriod: 30 },
  { id: 'uESiwLEGvXkcypWpgb1H', name: 'trimestres', daysPeriod: 90 }
];

//Component - ProductsForm
export const moratoriumPeriods = [
  { id: 1, title: 'Incremental' },
  { id: 2, title: 'Directo' }
];

//Component - Companiesform
export const customerTypes = [
  { id: 'K2rZFAAoLJ4EwbYTcpPZ', name: 'Contratista' },
  { id: 'yivxrnwNXncxRiK4guGv', name: 'Nómina' }
];

export const cutDays = [
  { id: 'VSNcicU4KXmV0xNp9Bry', name: 'Lunes' },
  { id: '9bJoM2419kX18aOFmSIx', name: 'Martes' },
  { id: 'Ni123ye6YvE7UN832mpT', name: 'Miercoles' },
  { id: 'kiZCuCprcqfqGOgxD4Dj', name: 'Jueves' },
  { id: 'nu1tTLs02dZAn3ZANJJU', name: 'Viernes' },
  { id: 'Sx01oAIMTv63sDMPwqk4', name: 'Sabado' },
  { id: 'Uf6iFquVTiiP6q1gPDTI', name: 'Domingo' }
];

export const paymentTypes = [
  { id: 'U5WdUFTTCptuaYW9sb1L', name: 'Total de ingresos' },
  { id: 'iyEbSUZMM6Bz3UUdc5iL', name: 'Solo retención' }
];

//Component - EmployeesList
export const userStatus = [
  { id: 'kxravKT7tJeEaxcC6LCk', name: 'No registrado' },
  { id: 'tP4OAsXxQh4OZsln5D5G', name: 'pendiente de archivos' },
  { id: '3toR0Sek2yyQ7KgG1tuD', name: 'Pendiente de firma' },
  { id: '9jhYU6RndZjJjR3CAT4M', name: 'Verificado' }
];

//Component - EmployeeListDocumnents
export const documentsTypes = [
  { id: '1', name: 'Instrucción' },
  { id: '2', name: 'Carátula' },
  { id: '3', name: 'Contrato único(por crédito)' },
  { id: '4', name: 'Pagaré' }
];

export const documentsValidations = [
  { id: '1', name: 'Pendiente de revisión' },
  { id: '2', name: 'Aceptado' },
  { id: '3', name: 'Rechazado' },
];

export const menuAccess = [
  { id: 1, name: 'todos los submenús' },
  { id: 2, name: 'algunos submenús' }
];

//Component - NotificationsListContainer
export const notificationProgram = 'scheduled';
export const notificationSend = 'sent';
export const notificationCancel = 'canceled';

//Component - VisaContainer
export const TAB_PENDING = 'PENDING';
export const TAB_APPROVED = 'APPROVED';
export const TAB_DISMISSED = 'DISMISSED';
