import React, { useEffect, useCallback, useState, useContext } from 'react';
import Container from '../../common/Container/Container';
import CompaniesAddEditFormCo from './CompaniesAddEditFormCo';
import CompaniesAddEditFormMx from './CompaniesAddEditFormMx';
import CompanyServices from '../../../services/CompanyServices';
import HomeContext from '../../../context/HomeContext';
import { refsPeriodicity } from '../../../constants/refsCollection';
import UserContext from '../../../context/UserContext';
import { showMessageAction } from '../../../context/actions/message/messageAction';
import { companiesListBase } from '../../../constants/appRoutes';
import { initialStateCompany } from './InitialState';

const companyTrasnform = (company, emailNotification, extraField) => {
    const newCompany = {
        ...company,
        periodicityRef: `${refsPeriodicity}/${company.periodicityRef?.id}`,
        hiddenFields: company.hiddenFields?.value,
        emailNotification,
        extraField
    };
    return newCompany;
};
const CompaniesContainerForm = (props) => {
    const { match, history } = props;
    const [companies, setCompanies] = useState(initialStateCompany);
    const codeCountry = match.params.country;
    const companyId = match.params.companyId;
    const dispatch = useContext(HomeContext)[1];
    const { state: userState } = useContext(UserContext);
    const title = companyId ? 'Editar empresa' : 'Agregar empresa';

    const showMessage = useCallback((type, message) => {
        dispatch(showMessageAction({ open: true, type, message }));
    }, [dispatch]);

    const getCompanyById = useCallback(async () => {
        const companyServices = new CompanyServices();
        const response = await companyServices.getCompanyId(codeCountry, companyId);
        if (response?.status === 200) {
            setCompanies(response.data);
        } else {
            showMessage('error', '¡No se pudo obtener el detalle de la empresa seleccionada!')
        }
    }, [codeCountry, companyId, showMessage]);


    const addCompany = async (company, emailNotification, extraField) => {
        const newCompany = companyTrasnform(company, emailNotification, extraField);
        const companyServices = new CompanyServices();
        const response = await companyServices.addCompany(codeCountry, newCompany);

        if (response?.status === 200) {
            showMessage('success', '¡La empresa guardó exitosamente!');
            history.push(`/${companiesListBase}/${codeCountry}`);
        } else {
            const message = `¡Error: ${response?.data?.detail}!`;
            showMessage('error', message);
        }
    };
    const editCompany = async (company, emailNotification, extraField) => {
        const newCompany = { ...companyTrasnform(company, emailNotification, extraField), idUserEdit: userState.id };

        const companyServices = new CompanyServices();
        const response = await companyServices.editCompany(codeCountry, companyId, newCompany);

        if (response?.status === 200) {
            showMessage('success', '¡La empresa fué actualizada exitosamente!');
            history.push(`/${companiesListBase}/${codeCountry}`);
        } else {
            const message = `¡Error: ${response?.data?.detail}!`;
            showMessage('error', message);
        }
    };

    useEffect(() => {
        if (companyId) {
            getCompanyById();
        }
    }, [companyId, getCompanyById]);
    return (
        <React.Fragment>
            <Container
                applicationName="Empresas"
                titleApplications={title}
            >
                {codeCountry === 'co' ?
                    <CompaniesAddEditFormCo
                        addCompany={companyId ? editCompany : addCompany}
                    /> :
                    <CompaniesAddEditFormMx
                        initialState={companies}
                        addCompany={companyId ? editCompany : addCompany}
                    />}

            </Container>
        </React.Fragment>
    );
};

export default CompaniesContainerForm;