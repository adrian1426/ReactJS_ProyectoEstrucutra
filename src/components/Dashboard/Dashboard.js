import React from 'react';
import Container from '../common/Container/Container';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import ContainerDashboard from './ContainerDashboard'

const styles = {
    button: {
        boxShadow: 'none',
        marginLeft: '10px'
    }
};
const Dashboard = () => {
    return (
        <Container
            applicationName={'Dashboard'}
            titleApplications={'Tablero de Control'}
            componentHeader={
                <Button
                    color="primary"
                    variant="contained"
                    style={styles.button}
                    startIcon={<Save style={{ color: 'white' }} />}
                >
                    Guardar
                </Button>
            }
        >
            <ContainerDashboard />
        </Container>
    );

}
export default Dashboard;