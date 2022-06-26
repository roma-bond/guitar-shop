import { render, screen, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { GuitarType } from '../../types/guitars';
import * as actionCreators from '../../store/cart-reducer';
import CartItem from './cart-item';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  data: {
    guitars: [],
  },
});

describe('Component: CartItem', () => {
  const props = {
    guitar: {
      id: 1,
      name: 'Честер Bass',
      vendorCode: 'SO757575',
      type: 'electric' as GuitarType,
      description:
        'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
      previewImg: 'img/guitar-1.jpg',
      stringCount: 7,
      rating: 4,
      price: 17500,
      reviews: [],
      guitarCount: 4,
    },
  };

  it('should render CartItem correctly', () => {
    render(
      <Provider store={store}>
        <CartItem {...props} />
      </Provider>,
    );

    expect(screen.getByLabelText('Удалить')).toBeInTheDocument();
    expect(screen.getByText('Артикул: SO757575')).toBeInTheDocument();
    expect(screen.getByText('17 500 ₽')).toBeInTheDocument();
  });

  it('should enable a handler function on Delete button click', () => {
    const mockRemove = jest.spyOn(actionCreators, 'removeGuitarFromCart');
    render(
      <Provider store={store}>
        <CartItem {...props} />
      </Provider>,
    );

    const deleteButtonElement = screen.getByLabelText('Удалить');
    fireEvent(
      deleteButtonElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockRemove).toBeCalledTimes(1);
    expect(mockRemove).toBeCalledWith(1);
  });

  it('should enable a handler function on Decrease amount button click', () => {
    const mockDecrease = jest.spyOn(actionCreators, 'decreaseCartGuitarCount');
    render(
      <Provider store={store}>
        <CartItem {...props} />
      </Provider>,
    );

    const decreaseButtonElement = screen.getByLabelText('Уменьшить количество');
    fireEvent(
      decreaseButtonElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockDecrease).toBeCalledTimes(1);
    expect(mockDecrease).toBeCalledWith(1);
  });

  it('should enable a handler function on Increase amount button click', () => {
    const mockIncrease = jest.spyOn(actionCreators, 'increaseCartGuitarCount');
    render(
      <Provider store={store}>
        <CartItem {...props} />
      </Provider>,
    );

    const increaseButtonElement = screen.getByLabelText('Увеличить количество');
    fireEvent(
      increaseButtonElement,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockIncrease).toBeCalledTimes(1);
    expect(mockIncrease).toBeCalledWith(1);
  });

  it('should enable a handler function on input change', () => {
    const mockUpdate = jest.spyOn(actionCreators, 'updateCartGuitarCount');
    render(
      <Provider store={store}>
        <CartItem {...props} />
      </Provider>,
    );

    const updateInputElement = screen.getByRole('spinbutton');
    expect(updateInputElement).toBeInTheDocument();
    fireEvent.change(updateInputElement, {target: {value: '10'}});
    expect(mockUpdate).toBeCalledTimes(1);
    expect(mockUpdate).toBeCalledWith({'id': 1, 'updateBy': 10});
  });
});
