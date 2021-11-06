import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Styles from './DashBoard.module.css';



const CardsBoard = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Monto Máximo de Crédito</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.amountMax}</label></div>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Plazo Máximo de Crédito (meses)</label>
                    <label className={Styles.subTitleText}>(no puede ser mayor {props.months} )</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.term}</label></div>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Porcentaje Máximo de Retención o Pago Máximo en Pesos</label>
                    <label className={Styles.subTitleText}>(no puede ser mayor {props.maxRetention})</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.retention}</label></div>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Porcentaje Máximo de lo Trabajado para Adelantar</label>
                    <label className={Styles.subTitleText}>(no puede ser mayor {props.percentageMaxWorked})</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.percentageWorked}</label></div>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Porcentaje Máximo de lo NO Trabajado para Adelantar</label>
                    <label className={Styles.subTitleText}>(no puede ser mayor {props.percentageMaxNotWorked} )</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.percentageNotWorked}</label></div>

                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="row" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <Box flexDirection="column">
                        <label className={Styles.titleText}>Crédito habilitado para todos</label>

                    </Box>
                    <Box flexDirection="column">
                        <label className={Styles.titleText}>Adelanto habilitado para todos</label>

                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box display="flex" flexDirection="column" p={2} m={1} bgcolor="background.paper" borderRadius="20px">
                    <label className={Styles.titleText}>Antiguedad Minima (meses)</label>
                    <div className={Styles.box}>
                        <label className={Styles.textBox}>{props.antiquity}</label></div>

                </Box>
            </Grid>
        </Grid >
    );
};

export default CardsBoard;