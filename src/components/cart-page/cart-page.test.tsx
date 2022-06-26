import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import CartPage from './cart-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  cart: {
    cartGuitars: [],
  },
});

describe('Component: CartPage', () => {
  it('should render CartPage correctly', () => {
    render(
      <Provider store={store}>
        <CartPage />
      </Provider>,
    );

    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
