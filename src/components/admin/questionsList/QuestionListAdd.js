import React from 'react';
import Button from '@material-ui/core/Button';


const styles = {
    button: {
      minWidth: '230px',
      marginLeft: '12px'
    },
    divInput: {
      display: 'none'
    }
  };

// 

export const QuestionListAdd = props => {

  const {openEdit,setOpenEdit,setIsAddQuestionEnable}=props

    return (
        <div>
             <Button
            style={styles.button}
            variant="contained"
            color="secondary"
            component="span"
            onClick={()=>{
              setOpenEdit(true);
              setIsAddQuestionEnable(true);
            }
            }
           
          >
           Agregar pregunta
          </Button>
            
        </div>
    )
}
