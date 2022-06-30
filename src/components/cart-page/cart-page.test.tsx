import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import CartPage from './cart-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  cart: {
    cartGuitars: [],
    cartGuitarBeforeRemove: null,
    discount: {
      amount: 0,
      value: '',
    },
  },
});

describe('Component: CartPage', () => {
  it('should render CartPage correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/cart'] });

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <CartPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
