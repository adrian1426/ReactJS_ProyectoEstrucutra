import React from 'react';
import Box from '@material-ui/core/Box';
import Styles from './Container.module.css'

const SubContainer = (props) => {
    return (
        <Box
            className={Styles.subContainer}
        >
            {props.children}
        </Box>
    );
};
export default SubContainer;