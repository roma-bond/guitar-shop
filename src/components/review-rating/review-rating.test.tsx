import ReviewRating from './review-rating';
import { render, screen } from '@testing-library/react';

const reviewRatingData = {
  onLabelClick: jest.fn(),
  onInputChange: jest.fn(),
  rateIsValid: false,
  rating: 3,
  ratingRef: null,
};

describe('Component: ReviewRating', () => {
  it('should render ReviewRating correctly', () => {
    render(<ReviewRating {...reviewRatingData} />);

    expect(screen.getByText(/Поставьте оценку/i)).toBeInTheDocument();
  });
});
