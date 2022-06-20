import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFoundPage from './not-found-page';

describe('Component: NotFoundPage', () => {
  it('should render NotFoundPage correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <NotFoundPage />
      </Router>,
    );

    expect(screen.getByText(/404 - Страница не найдена/i)).toBeInTheDocument();
  });
});
