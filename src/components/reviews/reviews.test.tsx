import Reviews from './reviews';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const reviews = [
  {
    id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a',
    userName: 'Саша',
    advantage: 'Хорошо. Очень хорошо.',
    disadvantage: 'Плохо. Очень плохо.',
    comment: 'Неплохо, но дорого.',
    rating: 3,
    createAt: '2021-10-28T12:32:16.934Z',
    guitarId: 1,
  },
];

describe('Component: Reviews', () => {
  it('should render Reviews correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router location={history.location} navigator={history}>
        <Reviews reviews={reviews} />
      </Router>,
    );

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });
});
