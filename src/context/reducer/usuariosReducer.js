import { agregarUsuario } from '../actions/usuarios/usuariosType';

const usuariosReducer = (state, action) => {
  switch (action.type) {
    case agregarUsuario:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default usuariosReducer;