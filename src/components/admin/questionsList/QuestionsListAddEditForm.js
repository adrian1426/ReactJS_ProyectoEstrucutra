import React, { useState, useEffect }  from 'react';
import DialogContainer from './../../common/dialog/dialogContainer/DialogContainer';
import DialogContent from './../../common/dialog/dialogContainer/DialogContent';
import DialogActions from './../../common/dialog/dialogContainer/DialogActions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
  marginTop: {
    marginTop: '8px'
  },
  button: {
    width: '130px',
    borderRadius: '15px !important',
    marginLeft: '13px'
  }
};

const QuestionsListAddEditForm = props => {
const {openEdit,closeEditQuestion,selectedQuestionEdit,editQuestions,isAddQuestionEnable}=props;
const [questionEdit, setQuestionEdit] = useState(selectedQuestionEdit);

useEffect(() => {
  setQuestionEdit(selectedQuestionEdit);
}, [selectedQuestionEdit]);

useEffect(() => {
 if (isAddQuestionEnable===true)
 {
  setQuestionEdit({activo: null,
    borrado: false,
    fecha: null,
    fecha_creacion: null,
    id: 18,
    idpais: 119,
    idusuario: null,
    posicion: 1,
    pregunta: "",
    respuesta: ""

 });
 }


}, [isAddQuestionEnable]);





const onChange = e => {
  const { name, value } = e.target;
 // console.log(' name ',name,' value ',value)
  
   setQuestionEdit({
     ...questionEdit,
     [name]:  value
   });
  
};

const onEditQuestion = () => {
  editQuestions(questionEdit);
  closeEditQuestion();
};


  return (
    <DialogContainer
      open={openEdit}
      handleClose={closeEditQuestion}
      title={ isAddQuestionEnable===false ? 'Editar pregunta' : 'Agregar pregunta'}
    >
      <div>
        <DialogContent>
        
          <TextField
            placeholder='Pregunta'
            variant="outlined"
            style={styles.marginTop}
            fullWidth
            multiline
            name='pregunta'
            onChange={onChange}
            defaultValue={questionEdit?.pregunta}
          />

          <TextField
            placeholder='Respuesta'
            variant="outlined"
            style={styles.marginTop}
            fullWidth
            multiline
            name='respuesta'
            onChange={onChange}
            defaultValue={questionEdit?.respuesta}
          />
        </DialogContent>



        <DialogActions>
          <Button
            style={styles.button}
            color="primary"
            variant="outlined"
            onClick={closeEditQuestion}
          >
            Cancelar
          </Button>

          <Button
            style={styles.button}
            color="primary"
            variant="contained"
            onClick={onEditQuestion}
          >
            Aceptar
          </Button>
        </DialogActions>
      </div>
    </DialogContainer>
  );
};

export default QuestionsListAddEditForm;