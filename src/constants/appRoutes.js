//products routes
export const productsListBase = 'listado-productos';
export const productsFormBase = 'alta-productos';
export const productsList = `/${productsListBase}/:country`;
export const productsForm = `/${productsFormBase}/:country/:productId?`;
//companies routes
export const companiesListBase = 'listado-empresas';
export const companiesFormBase = 'alta-empresas';
export const companiesList = `/${companiesListBase}/:country`;
export const companiesForm = `/${companiesFormBase}/:country/:companyId?`;
//employees routes
export const employeesListBase = 'listado-empleados';
export const employeesDetailBase = 'detalle-empleado';
export const employeesListDocumentsBase = 'listado-documentos';
export const employeesDocumentsValidationBase = 'documentos-validacion';
export const employeesList = `/${employeesListBase}/:country`;
export const employeesDetail = `/${employeesDetailBase}/:country/:employeeId`;
export const employeesListDocuments = `/${employeesListDocumentsBase}/:country`;
export const employeesDocumentsValidation = `/${employeesDocumentsValidationBase}/:country`;
//admin users-profiles routes
export const usersListBase = 'listado-usuarios';
export const profilesListBase = 'listado-perfiles';
export const usersList = `/${usersListBase}/:country`;
export const profilesList = `/${profilesListBase}/:country`;
//admin questions
export const questionsListBase = 'preguntas-frecuentes';
export const questionsList = `/${questionsListBase}/:country`;
//notifications routes
export const notificationsListBase = 'listado-notificaciones';
export const notificationsMassiveBase = 'notificaciones';
export const notificationsDetailsBase = 'detalle-notificacion';
export const notificationsMassive = `/${notificationsMassiveBase}/:country`;
export const notificationsList = `/${notificationsListBase}/:country/:statusId?`;
export const notificationsDetails = `/${notificationsDetailsBase}/:country/:notificacionId`;
//reports routes
export const requestsReportBase = 'reporte-solicitudes';
export const requestReport = `/${requestsReportBase}/:country`;
//credits routes
export const visaBase = 'visacion';
export const visa = `/${visaBase}/:country/:statusId?`;

