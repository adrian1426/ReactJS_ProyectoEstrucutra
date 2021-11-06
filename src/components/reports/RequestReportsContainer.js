import React, { useState, useCallback, useEffect, useContext } from 'react';
import CompanyServices from '../../services/CompanyServices';

import Container from '../common/Container/Container';
import SubContainer from './../common/Container/SubContainer';
import RequestsReportFilter from './requestsReport/RequestsReportFilter';
import RequestsReportList from './requestsReport/RequestsReportList';
import RequestReportsListOptions from './requestsReport/RequestReportsListOptions';

const RequestReportsContainer = props => {
    const { match, history } = props;
    const [companies, setCompanies] = useState([]);
    const codeCountry = match.params.country;
    const dataDummie = [
        {
            'request_id': 1,
            'request_status': 'Desembolsado',
            'period': 50,
            'register_date': '2020/12/14',
            'employee': 'Erik Vidal Jiménez',
            'employeeStatus': 'Aceptado',
            'company': 'Alphacredit',
            'payroll_number': 421567864,
            'clabe': '123456789123456789',
            'bontu_amount': 300569,
            'total_amount': 500000,
            'commission': 10000,
            'rfc': 'VIJE900502',
            'contracting_date': '2020/12/14',
            'amount_requested': 100000,
            'balance': 89000,
            'total_paid': 11000,
            'comission_percent': '10%',
            'interest_rate': '2%',
            'term': '20',
            'retention_percent': '10%',
            'credit_product': 'Uber Drive Aval AAA',
            'cat': '2%',
            'product_credit_id': 1

        },

    ];

    const getCompanies = useCallback(async () => {
        const companyServices = new CompanyServices();
        const response = await companyServices.getCompanies(codeCountry);
        if (response?.status === 200 && response.data.length > 0) {
            const companiesActives = response.data.filter(item => (item.isActive && item.isDeleted !== true && item.businessName !== null));
            setCompanies(companiesActives);
        } else {
            setCompanies([]);
        }
    }, [codeCountry]);

    const downloadReport = (e) => {
        //Funcion para descargar el reporte basado en los filtros aplicados
    }



    useEffect(() => {
        getCompanies();
    }, [getCompanies]);

    return (
        <Container
            applicationName={'Reportes'}
            titleApplications={'Reporte de solicitudes'}
            componentHeader={
                <RequestReportsListOptions
                    downloadReport={downloadReport} />
            }
        >
            <SubContainer>
                <RequestsReportFilter companies={companies} />
                <RequestsReportList creditList={dataDummie} />
            </SubContainer>
        </Container>
    );
};

export default RequestReportsContainer;