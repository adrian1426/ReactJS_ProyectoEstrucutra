import { agregarUsuario } from './usuariosType';

export const agregarUsuarioAction = payload => ({
    type: agregarUsuario,
    payload
});