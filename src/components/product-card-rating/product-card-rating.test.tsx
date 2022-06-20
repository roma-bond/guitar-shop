import ProductCardRating from './product-card-rating';
import { render, screen } from '@testing-library/react';

const productCardRatingData = {
  id: '4',
  rating: 4,
  starWidth: 10,
  starHeight: 10,
  componentClassName: 'dgsdgrsrsrs',
  estimateLabel: 'ОЦЕНКА',
  reviewsCount: 16,
};

describe('Component: ProductCardRating', () => {
  it('should render ProductCardRating correctly', () => {
    render(<ProductCardRating {...productCardRatingData} />);

    expect(screen.getAllByTestId('full-star')).toHaveLength(4);
    expect(screen.getByText(/Всего оценок:/i)).toBeInTheDocument();
  });
});
