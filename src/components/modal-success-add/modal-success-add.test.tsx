import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import ModalSuccessAdd from './modal-success-add';

const history = createMemoryHistory();

describe('Component: ModalSuccessAdd', () => {
  it('should render ModalSuccessAdd correctly', async () => {
    render(
      <Router location={history.location} navigator={history}>
        <ModalSuccessAdd
          onContinueShopping={jest.fn()}
          onClose={jest.fn()}
        />
      </Router>,
    );

    expect(
      screen.getByText('Товар успешно добавлен в корзину'),
    ).toBeInTheDocument();
  });

  it('should enable close handler on clicking the Close button', () => {
    const mockCloseFn = jest.fn();
    render(
      <Router location={history.location} navigator={history}>
        <ModalSuccessAdd
          onContinueShopping={jest.fn()}
          onClose={mockCloseFn}
        />
      </Router>,
    );

    const button = screen.getByTestId('close');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockCloseFn).toBeCalledTimes(1);
  });
});
