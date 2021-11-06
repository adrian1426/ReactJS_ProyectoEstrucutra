import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18next/config';
import { UserProvider } from '../../../context/UserContext';
import { HomeProvider } from '../../../context/HomeContext';
import { rootReducer } from '../../../context/reducer/rootReducer';
import { initialStateConfirmation } from '../../../context/initialState/confirmation';
import { initialStateMessage } from '../../../context/initialState/message'

const ProductsContainerListWrapper = props => {
  const { children } = props;

  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <HomeProvider
          reducer={rootReducer}
          initialState={{
            confirmationState: initialStateConfirmation,
            messageState: initialStateMessage
          }}
        >
          {children}
        </HomeProvider>
      </UserProvider>
    </I18nextProvider>
  );
};

export default ProductsContainerListWrapper;