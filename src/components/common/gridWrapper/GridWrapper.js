import React from 'react';
import Grid from '@material-ui/core/Grid';

const GridWrapper = (props) => {
    return (
        <Grid item lg={3} md={4} xs={6} >
            {props.children}
        </Grid>
    );
};

export default GridWrapper;