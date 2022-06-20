import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  data: {
    guitars: [],
  },
});

describe('Component: Header', () => {
  it('should render Header correctly', () => {
    const history = createMemoryHistory({ initialEntries: ['/cart'] });
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    fireEvent(
      screen.getByText('Каталог'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.pathname).toBe('/catalog');
  });
});
