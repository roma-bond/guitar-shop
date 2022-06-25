import ModalSuccessAdd from './modal-success-add';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Component: ModalSuccessAdd', () => {
  it('should render ModalSuccessAdd correctly', async () => {
    render(<ModalSuccessAdd onContinueShopping={jest.fn()} onClose={jest.fn()} />);

    expect(
      screen.getByText('Товар успешно добавлен в корзину'),
    ).toBeInTheDocument();
  });

  it('should enable close handler on clicking the Close button', () => {
    const mockSubmitFn = jest.fn();
    render(<ModalSuccessAdd onContinueShopping={mockSubmitFn} onClose={jest.fn()} />);

    const button = screen.getByTestId('close');
    fireEvent(
      button,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockSubmitFn).toBeCalledTimes(1);
  });
});
