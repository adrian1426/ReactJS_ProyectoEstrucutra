import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from "react-router-dom";
import { productsList, productsListBase } from '../../../constants/appRoutes';
import ProductsContainerListWrapper from './ProductsContainerListWrapper';
import ProductsContainerList from '../../../components/products/ProductsContainerList';
import nock from 'nock';
import { getProducts } from '../../servicesMock/productosServicesMock';
import { headersConfig } from '../../servicesMock/config';

describe('ProductsContainerList-Test', () => {

  nock(process.env.REACT_APP_WALLET_WEB_ADMIN)
    .get(getProducts.path)
    .query({ country: 'mx' })
    .reply(200, getProducts.responseSuccess, headersConfig);

  test('Listado de productos - exitoso', async () => {
    render(
      <ProductsContainerListWrapper>
        <MemoryRouter initialEntries={[`/${productsListBase}/mx`]}>
          <Route exact path={productsList} component={ProductsContainerList} />
        </MemoryRouter>
      </ProductsContainerListWrapper>
    );

    const listProducts = screen.getByTestId('tableList');
    const listProductsHead = screen.getByTestId('tableListHead');

    //Validar que exista una tabla en pantalla
    expect(listProducts).toBeInTheDocument();

    //validar el nombre de columnas de la tabla de productos en MX
    const th = listProductsHead.querySelectorAll('th');
    expect(th[0].querySelector('span')).toHaveTextContent('Nombre');
    expect(th[1].querySelector('span')).toHaveTextContent('Empresa');
    expect(th[2].querySelector('span')).toHaveTextContent('Tasa de interés anual');
    expect(th[3].querySelector('span')).toHaveTextContent('Plazo contratado');
    expect(th[4].querySelector('span')).toHaveTextContent('Plazo complementario');
    expect(th[5].querySelector('span')).toHaveTextContent('Periodicidad');
    expect(th[6].querySelector('span')).toHaveTextContent('Tasa del periodo');
    expect(th[7].querySelector('span')).toHaveTextContent('Tasa de IVA');
    expect(th[8].querySelector('span')).toHaveTextContent('Capitaliza interés');
    expect(th[9].querySelector('span')).toHaveTextContent('Periodo moratorio');
    expect(th[10].querySelector('span')).toHaveTextContent('Tasa de interés moratoria');
    expect(th[11]).toHaveTextContent('Acciones');

    await screen.findByTestId('tableCell');
    console.log(screen.getByTestId('tableCell').innerHTML);
  });
});