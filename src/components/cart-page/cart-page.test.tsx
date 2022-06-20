import { render, screen } from '@testing-library/react';
import CartPage from './cart-page';

describe('Component: CartPage', () => {
  it('should render CartPage correctly', () => {
    render(<CartPage />);

    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });
});
