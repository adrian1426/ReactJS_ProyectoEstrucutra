import React, { createContext, useReducer } from 'react';
import reducer from './reducer/usuariosReducer';
import { initialStateUser } from './initialState/usuario';

const UserContext = createContext();

export const UserProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialStateUser);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;