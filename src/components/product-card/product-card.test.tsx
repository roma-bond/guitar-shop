import ProductCard from './product-card';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const guitar = {
  id: 4,
  name: 'lkdsjfglsdkjfgl',
  previewImg: 'liushlisuhrla',
  rating: 4,
  price: 100000,
  reviewsCount: 30,
  onBuy: jest.fn(),
};

describe('Component: ProductCard', () => {
  it('should render ProductCard correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <ProductCard {...guitar} isInCart={false} linkTo={'/catalog'} />
      </Router>,
    );

    expect(screen.getByTestId('name').innerHTML).toBe(guitar.name);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image.src).toBe(`http://localhost/${guitar.previewImg}`);

    expect(screen.getByTestId('price').innerHTML).toBe(
      '<span class="visually-hidden">Цена:</span>100 000 ₽',
    );

    expect(screen.getByText('Подробнее')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
