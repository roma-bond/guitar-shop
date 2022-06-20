import { render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductPage from './product-page';
import * as apiActions from '../../store/api-actions';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

describe('Component: ProductPage', () => {
  it('should render ProductPage correctly', () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);

    const guitar = {
      id: 100,
      name: 'Taylor 414ce',
      vendorCode: 'SO757575',
      type: 'electric',
      description:
        'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
      previewImg: 'img/guitar-1.jpg',
      stringCount: 7,
      rating: 4,
      price: 17500,
      reviews: [],
    };

    const store = mockStore({
      data: {
        guitars: [],
        guitar,
      },
    });

    const history = createMemoryHistory();
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarAndReviewsAction');

    const fakeApp = (
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ProductPage />
        </Router>
      </Provider>
    );

    render(fakeApp);

    waitFor(async () => expect(mockFetch).toBeCalledTimes(1)).then();
    waitFor(async () => expect(mockFetch).toBeCalledWith(guitar.id)).then();
    waitFor(
      async () =>
        await expect(screen.findByText(guitar.name).then()).toBeInTheDocument(),
    ).then();
    expect(screen.getByText('Добавить в корзину')).toBeInTheDocument();
  });
});
