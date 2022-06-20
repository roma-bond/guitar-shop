import ModalSuccessReview from './modal-success-review';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Component: ModalSuccessReview', () => {
  it('should render ModalSuccessReview correctly', async () => {
    render(<ModalSuccessReview onModalClose={jest.fn()} />);

    expect(screen.getByText('Спасибо за ваш отзыв!')).toBeInTheDocument();
  });

  it('should enable close handler on clicking the Back to Purchase button', () => {
    const mockSubmitFn = jest.fn();
    render(<ModalSuccessReview onModalClose={mockSubmitFn} />);

    const button1 = screen.getByTestId('close1');
    fireEvent(
      button1,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockSubmitFn).toBeCalledTimes(1);
  });

  it('should enable close handler on clicking the Close button', () => {
    const mockSubmitFn = jest.fn();
    render(<ModalSuccessReview onModalClose={mockSubmitFn} />);

    const button1 = screen.getByTestId('close2');
    fireEvent(
      button1,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(mockSubmitFn).toBeCalledTimes(1);
  });
});
