import Pagination from './pagination';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, createSearchParams } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('Component: Pagination', () => {
  it('should render Pagination correctly, max of 3 page icons to be rendered', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Pagination totalGuitars={150} activePage={3} searchParams={createSearchParams({})}/>
      </Router>,
    );

    const back = screen.queryByText('Назад');
    expect(back).toBeInTheDocument();

    const forward = screen.queryByText('Далее');
    expect(forward).toBeInTheDocument();

    waitFor(
      async () =>
        await expect(screen.findAllByRole('page-icon').then()).toHaveLength(3),
    ).then();
  });

  it('should not render Previous page button if active page = 1', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Pagination totalGuitars={15} activePage={1} searchParams={createSearchParams({})}/>
      </Router>,
    );

    const back = screen.queryByText('Назад');
    expect(back).not.toBeInTheDocument();

    const forward = screen.queryByText('Далее');
    expect(forward).toBeInTheDocument();

    waitFor(
      async () =>
        await expect(screen.findAllByRole('listitem').then()).toHaveLength(2),
    ).then();
  });

  it('should not render Next page button if active page = 2', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Pagination totalGuitars={15} activePage={2} searchParams={createSearchParams({})}/>
      </Router>,
    );

    const back = screen.queryByText('Назад');
    expect(back).toBeInTheDocument();

    const forward = screen.queryByText('Далее');
    expect(forward).not.toBeInTheDocument();

    waitFor(
      async () =>
        await expect(screen.findAllByRole('listitem').then()).toHaveLength(2),
    ).then();
  });
});
