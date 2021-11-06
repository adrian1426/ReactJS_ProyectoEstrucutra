import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoaderBackdrop from './../components/common/loader/LoaderBackdrop';
import {
  usersList, profilesList, employeesList, employeesDetail, notificationsDetails, productsList, productsForm, companiesList,
  companiesForm, employeesListDocuments, notificationsMassive, employeesDocumentsValidation, requestReport, notificationsList, questionsList,
  visa
} from '../constants/appRoutes';

const Dashboard = lazy(() => import('../components/Dashboard/Dashboard'));
const UsersContainerList = lazy(() => import('../components/users/UsersContainerList'));
const ProfilesContainerList = lazy(() => import('../components/profiles/ProfilesContainerList'));
const QuestionsContainerList = lazy(() => import('../components/admin/QuestionsContainerList'));
const EmployeesContainerList = lazy(() => import('./../components/employees/EmployeesContainerList'));
const EmployeesContainerDetails = lazy(() => import('./../components/employees/EmployeesContainerDetails'));
const EmployeesContainerListDocuments = lazy(() => import('./../components/employees/EmployeesContainerListDocuments'));
const ProductsContainerList = lazy(() => import('../components/products/ProductsContainerList'));
const ProductsContainerForm = lazy(() => import('../components/products/ProductsContainerForm'));
const CompaniesContainerList = lazy(() => import('../components/companies/CompaniesContainerList'));
const CompaniesContainerForm = lazy(() => import('../components/companies/companiesForm/CompaniesContainerForm'));
const NotificationsMassiveContainer = lazy(() => import('../components/notifications/NotificationsMassiveContainer'));
const NotificationsContainerList = lazy(() => import('../components/notifications/NotificationsContainerList'));
const NotificationsContainerDetails = lazy(() => import('../components/notifications/NotificationsContainerDetails'));
const EmployeesContainerDocumentsValidation = lazy(() => import('./../components/employees/EmployeesContainerDocumentsValidation'));
const RequestReportsContainer = lazy(()=> import('./../components/reports/RequestReportsContainer'));
const VisaContainer = lazy(()=>import('./../components/credits/VisaContainer'));

const AppRouter = () => {
  return (
    <Suspense fallback={<LoaderBackdrop open={true} />}>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path={usersList} component={UsersContainerList} />
        <Route exact path={profilesList} component={ProfilesContainerList} />
        <Route exact path={questionsList} component={QuestionsContainerList} />
        <Route exact path={employeesList} component={EmployeesContainerList} />
        <Route exact path={employeesDetail} component={EmployeesContainerDetails} />
        <Route exact path={employeesListDocuments} component={EmployeesContainerListDocuments} />
        <Route exact path={productsList} component={ProductsContainerList} />
        <Route exact path={productsForm} component={ProductsContainerForm} />
        <Route exact path={companiesList} component={CompaniesContainerList} />
        <Route exact path={companiesForm} component={CompaniesContainerForm} />
        <Route exact path={notificationsMassive} component={NotificationsMassiveContainer} />
        <Route exact path={notificationsList} component={NotificationsContainerList} />
        <Route exact path={notificationsDetails} component={NotificationsContainerDetails} />
        <Route exact path={employeesDocumentsValidation} component={EmployeesContainerDocumentsValidation} />
        <Route exact path={requestReport} component={RequestReportsContainer} />
        <Route exact path={visa} component={VisaContainer} />
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;