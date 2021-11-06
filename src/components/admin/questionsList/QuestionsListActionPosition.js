import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  label: {
    padding: theme.spacing(2),
    textAlign: 'center'
   
  },
  button: {
    width: "15px",
    height: "20px"
  },

  formContainer:{
   
    paddingleft: '30px',
    paddingright: '20px',
    paddingtop: '20px',
    paddingbottom: '20px',
  }
}));

const QuestionsListActionPosition = props => {
  const classes = useStyles();

  const {position,clickUp,clickDown} = props;
  return (
    <div>
         <div  className="text-center" style={{width: "auto"}}>
         <IconButton  size="small" onClick={()=>clickUp(position)} className={classes.button}> <ArrowUpwardIcon fontSize="inherit" /></IconButton >
         </div>
         <div >
         <IconButton  size="small" className={classes.button} >{position}</IconButton> 
         </div>
         <div>
         <IconButton size="small" onClick={()=>clickDown(position)} className={classes.button} > <ArrowDownwardIcon fontSize="inherit" /> </IconButton >
         </div>
  
       </div> 
  );
};

export default QuestionsListActionPosition;