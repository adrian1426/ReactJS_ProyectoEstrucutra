import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import QuestionsList from './questionsList/QuestionsList';
import Container from '../common/Container/Container';
import { QuestionListAdd } from './questionsList/QuestionListAdd';
import HomeContext from '../../context/HomeContext';
import { showConfirmationAction, hideConfirmationAction } from '../../context/actions/confirmation/confirmationAction';


const data = [{ "id": 18, "idpais": 119, "posicion": 1, "pregunta": "Se me olvid\u00f3 mi contrase\u00f1a para ingresar, \u00bfc\u00f3mo la puedo restablecer?", "respuesta": "1. Da click en \u00bfOlvidaste tu contrase\u00f1a? y captura el correo electr\u00f3nico que\ntenemos registrado\n2. Actualiza y confirma la nueva contrase\u00f1a \n3. Ingresa la nueva contrase\u00f1a en la app para disfrutar los beneficios", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 8, "idpais": 119, "posicion": 2, "pregunta": "\u00bfQu\u00e9 es y c\u00f3mo funciona el Cr\u00e9dito AXS?", "respuesta": "Para hacer uso, debes tener una oferta pre-aprobada y disponible.\nSe cobra una comisi\u00f3n por disposici\u00f3n y una tasa de inter\u00e9s mensual fija, sin comisiones ocultas ni letras chiquitas.\nEs flexible: t\u00fa seleccionas el monto a disponer, el plazo para pagarlo.", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 9, "idpais": 119, "posicion": 3, "pregunta": "\u00bfC\u00f3mo pago mi cr\u00e9dito?", "respuesta": "Cada periodo de pago de ganancias, se te descontar\u00e1 de manera\nautom\u00e1tica el porcentaje de ganancias que seleccionaste para pagar y se\nutilizar\u00e1 para cubrir intereses y capital. ", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 10, "idpais": 119, "posicion": 4, "pregunta": "\u00a1Lo quiero! \u00bfC\u00f3mo lo solicito?", "respuesta": "Es necesario que te registres con nosotros a trav\u00e9s de nuestra app\ndisponible en Android y iOS. S\u00f3lo te solicitamos una identificaci\u00f3n oficial\nvigente y un comprobante de domicilio reciente.", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 11, "idpais": 119, "posicion": 5, "pregunta": "\u00bfC\u00f3mo env\u00edo mi documentaci\u00f3n?", "respuesta": "Toda la documentaci\u00f3n se env\u00eda de forma digital en el app de AXS (toma\nde fotograf\u00eda y/o selecci\u00f3n de biblioteca de im\u00e1genes).", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 12, "idpais": 119, "posicion": 6, "pregunta": "La aplicaci\u00f3n me marca error cuando trato de cargar una imagen de mis documentos, \u00bfqu\u00e9 hago?", "respuesta": "En necesario intentar lo siguiente:\n1. Cerrar sesi\u00f3n\n2. Iniciar sesi\u00f3n nuevamente\n3. Intentar cargar la imagen nuevamente\nSi el problema persiste favor de ponerse en contacto v\u00eda tel\u00e9fono, correo", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 13, "idpais": 119, "posicion": 7, "pregunta": "Envi\u00e9 ya mis documentos y no he recibido respuesta.", "respuesta": "El proceso de validaci\u00f3n de documentos tarda un m\u00e1ximo de 12 hrs.\nh\u00e1biles. En caso de rebasar este plazo y aun no se encuentren validados,\ncont\u00e1ctanos para revisar el estatus.", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 14, "idpais": 119, "posicion": 8, "pregunta": "Mi contrato dice que tengo una l\u00ednea de cr\u00e9dito por $30,000 pesos, pero yo no solicit\u00e9 ese monto, ni he recibido ning\u00fan pr\u00e9stamo", "respuesta": "Esto no quiere decir que el monto de la l\u00ednea sea el m\u00e1ximo que podr\u00e1 disponer, ni tampoco que ya realizaste alguna disposici\u00f3n o que debas ese monto. La l\u00ednea de cr\u00e9dito se\nutiliza solicitando disposiciones que son independientes y sujetas a\nautorizaci\u00f3n", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 15, "idpais": 119, "posicion": 9, "pregunta": "\u00bfMe pueden depositar mi pr\u00e9stamo en otra cuenta diferente a la que recibo mis ganancias?", "respuesta": "No, por tu seguridad ese dato no lo podemos cambiar y el dep\u00f3sito se\nrealiza en la misma cuenta en la que recibes tu ganancias", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 19, "idpais": 119, "posicion": 10, "pregunta": "Pagu\u00e9 de m\u00e1s, \u00bfc\u00f3mo puedo solicitar un reembolso?", "respuesta": "Para hacer la solicitud correspondiente favor de ponerse en contacto\ncon nosotros. Se realizar\u00e1 un an\u00e1lisis y se te enviar\u00e1 un correo con el\nresultado; en caso de proceder, se realizar\u00e1 una transferencia por el monto\naprobado a la cuenta registrada", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 20, "idpais": 119, "posicion": 11, "pregunta": "Quiero liquidar de manera anticipada mi cr\u00e9dito", "respuesta": "Ser\u00e1 necesario solicitar una carta de liquidaci\u00f3n a trav\u00e9s de correo\nelectr\u00f3nico a la direcci\u00f3n: contacto@axs.lat indicando los siguientes datos:\n-Nombre completo\n-CURP\n-Tel\u00e9fono de contacto", "fecha": null, "idusuario": null, "activo": null, "borrado": false, "fecha_creacion": null }, { "id": 22, "idpais": 119, "posicion": 12, "pregunta": "\u00bfPorque no puedo ver el detalle de mis solicitudes?", "respuesta": "Por que si....", "fecha": "2020-08-20T11:11:31.341836+00:00", "idusuario": 93, "activo": true, "borrado": false, "fecha_creacion": "2020-08-20 11:11:31.341836+00:00" }, { "id": 23, "idpais": 119, "posicion": 13, "pregunta": "\u00c2\u00bfPorque no puedo ver el detalle de mis solicitudes?", "respuesta": "Por que si....", "fecha": "2020-08-20T17:24:04.384937+00:00", "idusuario": 93, "activo": true, "borrado": false, "fecha_creacion": "2020-08-20 17:24:04.384937+00:00" }, { "id": 24, "idpais": 119, "posicion": 14, "pregunta": "\u00c2\u00bfPorque no puedo ver el detalle de mis solicitudes?", "respuesta": "Por que si....", "fecha": "2020-08-20T17:24:07.263949+00:00", "idusuario": 93, "activo": true, "borrado": false, "fecha_creacion": "2020-08-20 17:24:07.263949+00:00" }, { "id": 25, "idpais": 119, "posicion": 15, "pregunta": "\u00c2\u00bfPorque no puedo ver el detalle de mis solicitudes?", "respuesta": "Por que si....", "fecha": "2020-08-20T17:26:27.710856+00:00", "idusuario": 93, "activo": true, "borrado": false, "fecha_creacion": "2020-08-20 17:26:27.710856+00:00" }]


const QuestionsContainerList = () => {
  const [questions, setQuestions] = useState(data);
  const [openEdit, setOpenEdit] = useState(false);
  const [isAddQuestionEnable, setIsAddQuestionEnable] = useState(false);
  const dispatch = useContext(HomeContext)[1];

  const editQuestions = edited => {
    if (isAddQuestionEnable === false) {
      setQuestions(questions => {
        let data = [...questions];
        let j = edited.posicion - 1

        data[j] = edited;


        return data;
      }



      );
    }
    else {
      setQuestions(questions => {
        let data = [...questions, edited];
        data[data.length - 1].posicion = data.length;





        return data;
      }

      );



    }
 
    setIsAddQuestionEnable(false);



  };



  const clickUp = (position) => {
    setQuestions(questions => {
      let data = [...questions];
      if (position === 1) {
        return data;
      }

      let j = position - 1
      let temp = data[j];

      data[j].posicion = data[j].posicion - 1
      data[j - 1].posicion = data[j - 1].posicion + 1
      data[j] = data[j - 1];
      data[j - 1] = temp;
     
      return data;
    })


  };
  const clickDown = (position) => {
    setQuestions(questions => {
      let data = [...questions];
      if (position === data.length) {
        return data;
      }
      let j = position - 1
      let temp = data[j];

      data[j].posicion = data[j].posicion + 1
      data[j + 1].posicion = data[j + 1].posicion - 1
      data[j] = data[j + 1];
      data[j + 1] = temp;
     
      return data;
    })


  };

  const confirmDeleteQuestion = data => {
    dispatch(showConfirmationAction(
      {
        open: true,
        textPrimary: 'Borrar pregunta',
        textSecundary: '¿Esta seguro que desea quitar esta pregunta',
        actionConfirm: () => deleteQuestion(data)
      }
    ));
  };

  const deleteQuestion = async data => {
    dispatch(hideConfirmationAction());
  

  };


  /* useEffect(() => {
     getQuestions();
   }, [getQuestions]);*/

  return (
    <React.Fragment>
      <Container
        applicationName="Administración"
        titleApplications="Preguntas frecuentes"
        componentHeader={
          <QuestionListAdd
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            setIsAddQuestionEnable={setIsAddQuestionEnable}
          />
        }


      >
        <QuestionsList
          questions={questions}
          clickUp={clickUp}
          clickDown={clickDown}
          isAddQuestionEnable={isAddQuestionEnable}
          confirmDeleteQuestion={confirmDeleteQuestion}

          editQuestions={editQuestions}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}

        />
      </Container>

    </React.Fragment>
  );
};

export default QuestionsContainerList;