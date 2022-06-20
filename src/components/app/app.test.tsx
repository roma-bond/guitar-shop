import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as apiMethods from '../../store/api-actions';
import App from '../app/app';
import thunk from 'redux-thunk';

const renderApp = (route = '/') => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({
    data: {
      guitars: [],
      guitar: {
        id: 1,
        name: 'Честер Bass',
        vendorCode: 'SO757575',
        type: 'electric',
        description:
          'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
        previewImg: 'img/guitar-1.jpg',
        stringCount: 7,
        rating: 4,
        price: 17500,
        reviews: [],
      },
    },
    server: {
      status: 200,
    },
  });

  const history = createMemoryHistory({ initialEntries: [route] });

  const fakeApp = (
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </Provider>
  );

  render(fakeApp);
};

describe('Application Routing', () => {
  it('Should render Header and Footer components on a page', async () => {
    renderApp();

    expect(screen.getByText(/Начать поиск/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Магазин гитар, музыкальных инструментов и гитарная мастерская/i,
      ),
    ).toBeInTheDocument();
  });

  it('Should render CatalogPage component when user navigates to /catalog', () => {
    renderApp('/catalog');

    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });

  it('Should render CartPage component when user navigates to /cart', () => {
    renderApp('/cart');

    expect(
      screen.getByText('Введите свой промокод, если он у вас есть.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Оформить заказ')).toBeInTheDocument();
  });

  it('Should render ProductPage component when user navigates to /product/:id', async () => {
    const mockFetch = jest.spyOn(apiMethods, 'fetchGuitarAndReviewsAction');
    renderApp('/product/33');

    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(33);

    const out = await waitFor(
      async () => await screen.findByTestId('guitar-name'),
    );

    expect(out).toBeInTheDocument();
  });

  it('Should render NotFoundPage component when user navigates to non-existent route', () => {
    renderApp('/some/bad/route');

    expect(screen.getByText(/404 - Страница не найдена/i)).toBeInTheDocument();
  });
});
