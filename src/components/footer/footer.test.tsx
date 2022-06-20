import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render Footer correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Footer />
      </Router>,
    );

    expect(
      screen.getByText(
        /Магазин гитар, музыкальных инструментов и гитарная мастерская/i,
      ),
    ).toBeInTheDocument();
  });
});
