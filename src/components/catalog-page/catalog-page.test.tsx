import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import * as apiActions from '../../store/api-actions';
import CatalogPage from './catalog-page';
import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { State } from '../../types/store';
import { AxiosInstance } from 'axios';
import { updateServerStatus } from '../../store/server-reducer';

const setupComponent = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const store = mockStore({
    data: {
      guitars: [
        {
          id: 1,
          name: 'Честер Bass',
          vendorCode: 'SO757575',
          type: 'electric',
          description:
            'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
          previewImg: 'img/guitar-1.jpg',
          stringCount: 7,
          rating: 4,
          price: 17500,
          reviews: [],
        },
        {
          id: 2,
          name: 'Taylor 414CE',
          vendorCode: 'SO757577',
          type: 'acoustic',
          description:
            'Вариант для настоящих профессионалов. Двенадцатиструнный инструмент оснащён карбоновыми струнами и корпусом из массива ели.',
          previewImg: 'img/guitar-2.jpg',
          stringCount: 6,
          rating: 5,
          price: 6500,
          reviews: [],
        },
      ],
      guitar: null,
    },
    server: {
      status: 200,
    },
  });

  const history = createMemoryHistory();

  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <CatalogPage />
      </Router>
    </Provider>,
  );

  return history;
};

describe('Component: CatalogPage', () => {
  it('should render CatalogPage correctly', async () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');

    setupComponent();

    const catalog = await waitFor(
      async () => await screen.findByTestId('catalog'),
    );
    expect(catalog).toBeInTheDocument();

    const product = await waitFor(
      async () => await screen.findAllByTestId('product'),
    );
    expect(product.length).toBe(2);
    expect(mockFetch).toBeCalledTimes(1);
    expect(screen.getByText('Каталог гитар')).toBeInTheDocument();
  });

  it('should update search params properly on "sort by price" click', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const buttonEl = screen.getByText('по цене');
    expect(buttonEl).toBeInTheDocument();

    fireEvent(
      buttonEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?_sort=price');
  });

  it('should update search params properly on "sort by rating" click', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const buttonEl = screen.getByText('по популярности');
    expect(buttonEl).toBeInTheDocument();

    fireEvent(
      buttonEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?_sort=rating');
  });

  it('should update search params properly on "sort by order" click', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const buttonOrderUpEl = screen.getByLabelText('По возрастанию');
    expect(buttonOrderUpEl).toBeInTheDocument();

    fireEvent(
      buttonOrderUpEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?_order=asc&_sort=price');

    const buttonOrderDownEl = screen.getByLabelText('По убыванию');
    expect(buttonOrderDownEl).toBeInTheDocument();

    fireEvent(
      buttonOrderDownEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?_order=desc&_sort=price');
  });

  it('should update search params properly on "filter by min price" input', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const minPriceInputEl = screen.getByLabelText('Минимальная цена');
    expect(minPriceInputEl).toBeInTheDocument();

    fireEvent.blur(minPriceInputEl, {target: {value: '5000'}});
    expect(history.location.search).toBe('?price_gte=5000');
  });

  it('should update search params properly on "filter by max price" input', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const maxPriceInputEl = screen.getByLabelText('Максимальная цена');
    expect(maxPriceInputEl).toBeInTheDocument();

    fireEvent.blur(maxPriceInputEl, {target: {value: '14000'}});
    expect(history.location.search).toBe('?price_lte=14000');
  });

  it('should update search params properly on "filter by type" input', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const acousticCheckboxEl = screen.getByLabelText('Акустические гитары');
    expect(acousticCheckboxEl).toBeInTheDocument();

    fireEvent(
      acousticCheckboxEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?type=acoustic');
  });

  it('should update search params properly on "filter by string count" input', () => {
    const mockFetch = jest.spyOn(apiActions, 'fetchGuitarsAndReviewsAction');
    mockFetch.mockImplementation(createAsyncThunk<
      void,
      string,
      {
        dispatch: Dispatch;
        state: State;
        extra: AxiosInstance;
      }
    >(
      'data/fetchGuitarsAndReviews',
      async (params, { dispatch, getState, extra: api }) => {
        dispatch(updateServerStatus(null));
      },
    ));

    const history = setupComponent();
    const stringCountCheckboxEl = screen.getByLabelText('4');
    expect(stringCountCheckboxEl).toBeInTheDocument();

    fireEvent(
      stringCountCheckboxEl,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(history.location.search).toBe('?stringCount=4');
  });
});
