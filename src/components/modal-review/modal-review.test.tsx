import ModalReview from './modal-review';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

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
});

describe('Component: ModalReveiw', () => {
  it('should render ModalReveiw correctly', async () => {
    const fakeApp = (
      <Provider store={store}>
        <ModalReview onModalClose={jest.fn()} onModalSubmit={jest.fn()} />
      </Provider>
    );
    render(fakeApp);

    const guitarName = await waitFor(
      async () => await screen.findByTestId('guitar-name'),
    );
    expect(guitarName.innerHTML).toBe('Честер Bass');
  });

  it('should not submit form data if data is not valid', async () => {
    const mockSubmitFn = jest.fn();
    const fakeApp = (
      <Provider store={store}>
        <ModalReview onModalClose={jest.fn()} onModalSubmit={mockSubmitFn} />
      </Provider>
    );
    render(fakeApp);

    const button = screen.getByTestId('submit');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(mockSubmitFn).toBeCalledTimes(0);
  });

  it('should submit form data if data is valid', async () => {
    const mockSubmitFn2 = jest.fn();
    const fakeApp = (
      <Provider store={store}>
        <ModalReview onModalClose={jest.fn()} onModalSubmit={mockSubmitFn2} />
      </Provider>
    );
    render(fakeApp);

    screen.findByTestId('star-2').then((ratingButton) => {
      fireEvent(
        ratingButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, { target: { value: 'User' } });

    const advantagesInput = screen.getByTestId('advantages');
    fireEvent.change(advantagesInput, { target: { value: 'Отлично' } });

    const disadvantagesInput = screen.getByTestId('disadvantages');
    fireEvent.change(disadvantagesInput, { target: { value: 'Ужасно' } });

    const comment = screen.getByTestId('comment');
    fireEvent.change(comment, { target: { value: 'Ничего себе' } });

    const button = screen.getByTestId('submit');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    waitFor(() => expect(mockSubmitFn2).toBeCalledTimes(1)).then();
  });
});
