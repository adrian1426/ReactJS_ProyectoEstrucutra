import React from 'react';
import { Button } from '@material-ui/core';

import Styles from './EmployeeListDocuments.module.css';

const EmployeeListDocumentsActions = props => {


    return (
        <div>
            <Button className={Styles.Actions} color='primary' variant='contained'>Filtrar</Button>
            <Button className={Styles.Actions} color='primary' variant='outlined'>Limpiar Filtros</Button>
        </div>
    );
};

export default EmployeeListDocumentsActions;