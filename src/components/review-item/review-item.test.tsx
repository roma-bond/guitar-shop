import { render, screen, waitFor } from '@testing-library/react';
import ReviewItem from './review-item';

describe('Component: ReviewItem', () => {
  it('should render ReviewItem correctly', async () => {
    const review = {
      id: 'a7c267d0-a72d-41bd-8b8e-e7f67800d58a',
      userName: 'Саша',
      advantage: 'Хорошо. Очень хорошо.',
      disadvantage: 'Плохо. Очень плохо.',
      comment: 'Неплохо, но дорого.',
      rating: 3,
      createAt: '2021-10-28T12:32:16.934Z',
      guitarId: 1,
    };

    render(<ReviewItem review={review} />);

    const advantages = waitFor(() => screen.findByTestId('advantage'));
    expect((await advantages).innerHTML).toBe(review.advantage);

    const disadvantages = waitFor(() => screen.findByTestId('disadvantage'));
    expect((await disadvantages).innerHTML).toBe(review.disadvantage);

    const comment = waitFor(() => screen.findByTestId('comment'));
    expect((await comment).innerHTML).toBe(review.comment);

    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
    expect(screen.getByText('Недостатки:')).toBeInTheDocument();
    expect(screen.getByText('Комментарий:')).toBeInTheDocument();
  });
});
