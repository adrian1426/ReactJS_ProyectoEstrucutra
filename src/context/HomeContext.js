import React, { createContext, useReducer } from 'react';

const HomeContext = createContext();

export const HomeProvider = (props) => {
  const { children, reducer, initialState } = props;

  return (
    <HomeContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeContext;