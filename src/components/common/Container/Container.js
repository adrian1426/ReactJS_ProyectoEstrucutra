import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Styles from './Container.module.css'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
}));

const Container = (props) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} >
          <Breadcrumbs separator="›" className={Styles.nameBreadCrumbs}>
            <label className={Styles.nameBreadCrumbs}>Aplicaciones</label>
            <Typography className={Styles.nameBreadCrumbs} >{props.applicationName}</Typography>
          </Breadcrumbs>
          <label className={Styles.titleApplications}>{props.titleApplications}</label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box display="flex" justifyContent="flex-end" m={1} p={1} style={{ minHeight: '40px' }}>
            {props.componentHeader}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </div>

  );

}
Container.propTypes = {
  applicationName: PropTypes.string.isRequired,
  titleApplications: PropTypes.string.isRequired,
  children: PropTypes.node,
  componentHeader: PropTypes.object
};
Container.defaultProps = { children: null }
export default Container;
