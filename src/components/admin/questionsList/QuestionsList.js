import React, { useState } from 'react';
import Subcontainer from '../../common/Container/SubContainer';
import Table from '../../common/table/Table';

import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import QuestionsListActionPosition from './QuestionsListActionPosition';
import QuestionsListAddEditForm from './QuestionsListAddEditForm';

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

  formContainer: {

    paddingleft: '30px',
    paddingright: '20px',
    paddingtop: '20px',
    paddingbottom: '20px',
  }
}));



const QuestionsList = props => {

  const classes = useStyles();
  const { questions, clickUp, clickDown, editQuestions,openEdit, setOpenEdit,isAddQuestionEnable,confirmDeleteQuestion } = props;
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  

 
  const addSelectedQuestion = question => {    
    setSelectedQuestion(question);
    setSelectedQuestion(
    (state) => { 
    
      
      return state; 
    }
    );
    
    setOpenEdit(true);
  };

  const closeEditQuestion = () => {
    setSelectedQuestion(null);
    setOpenEdit(false);
  };

 

  const actions = () => (
    [
      {
        Icon: EditIcon,
        tooltip: 'Editar pregunta',
        onClick: addSelectedQuestion
      },
      {
        Icon: DeleteIcon,
        tooltip: 'Borrar pregunta',
        onClick: confirmDeleteQuestion
      }
    ]);




  const columns = [

    {
      fieldId: 'posicion', label: 'Posicion', render: (row) => {

        return (
          <QuestionsListActionPosition
            position={row.posicion}
            clickUp={clickUp}
            clickDown={clickDown}
          />
        );
      }

    },
    { fieldId: 'idpais', label: 'ID País' },
    { fieldId: 'pregunta', label: 'Pregunta' },
    { fieldId: 'respuesta', label: 'Respuesta' },
    { fieldId: 'fecha_creacion', label: 'Fecha de creación' },
    { fieldId: 'idusuario', label: 'ID Usuario' },


  ];


  return (



    <Subcontainer>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.formContainer}>
          <Grid item xs={12}>
            <Table
              columns={columns}
              data={questions}
              dense={true}
              actions={actions}
              options={{

                paginationRows: [5, 10, 20, 30],

              }}

            />
          </Grid>
          <QuestionsListAddEditForm
            openEdit={openEdit}
            isAddQuestionEnable={isAddQuestionEnable}
            selectedQuestionEdit={selectedQuestion}
            closeEditQuestion={closeEditQuestion}
            editQuestions={editQuestions}
          />
        </Grid>
      </div>


    </Subcontainer>
  );
};

export default QuestionsList;