import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Header from './header';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  data: {
    guitars: [],
  },
  cart: {
    cartGuitars: [
      {
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
        guitarCount: 4,
      },
      {
        id: 2,
        name: 'Taylor 414CE',
        vendorCode: 'SO757577',
        type: 'acoustic',
        description:
          'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
        previewImg: 'img/guitar-2.jpg',
        stringCount: 6,
        rating: 5,
        price: 6500,
        reviews: [],
        guitarCount: 1,
      },
    ],
  },
});

describe('Component: Header', () => {
  it('should render Header correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/cart'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    fireEvent(
      screen.getByText('Каталог'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.pathname).toBe('/catalog');
  });

  it('should display correct amount of guitars in the cart', () => {
    const history = createMemoryHistory({ initialEntries: ['/cart'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>,
    );

    const cartIndexElement = screen.getByTestId('cartIndex');
    expect(cartIndexElement).toBeInTheDocument();
    expect(cartIndexElement.innerHTML).toBe('5');
  });
});
