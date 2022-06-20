import { createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import { loadGuitars, loadGuitar, updateGuitarReviews } from './guitar-reducer';
import { updateServerStatus } from './server-reducer';
import { APIRoute } from '../const';
import { Guitar, Review, NewUserReview } from '../types/guitars';
import { State } from '../types/store';
import { AxiosInstance } from 'axios';

export const fetchGuitarAndReviewsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchGuitarAndReviews', async (id, { dispatch, extra: api }) => {
  dispatch(loadGuitar(null));
  try {
    const { data: guitar } = await api.get<Guitar>(`${APIRoute.Guitars}/${id}`);
    if (guitar) {
      guitar.previewImg = `/img/content/catalog-product-${
        guitar.previewImg.split('-')[1]
      }`;

      try {
        const { data: reviews } = await api.get<Review[]>(
          `${APIRoute.Guitars}/${id}/comments`,
        );
        if (reviews) {
          dispatch(
            loadGuitar({
              ...guitar,
              reviews: reviews.sort(
                (a, b) => Date.parse(b.createAt) - Date.parse(a.createAt),
              ),
            }),
          );
        } else {
          dispatch(loadGuitar({ ...guitar, reviews: [] }));
        }
      } catch (error) {
        dispatch(loadGuitar({ ...guitar, reviews: [] }));
      }
    } else {
      dispatch(loadGuitar(null));
    }
  } catch (e) {
    dispatch(loadGuitar(null));
  }
});

export const fetchGuitarsAndReviewsAction = createAsyncThunk<
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
    // check Local Storage User Reviews
    const lsData = localStorage.getItem('userReviews');
    const userReviews: Review[] = lsData ? JSON.parse(lsData) : [];

    try {
      const { data: guitars } = await api.get<Guitar[]>(`${APIRoute.Guitars}${params}`);
      if (guitars) {
        const guitarsWithReviews = await Promise.all(
          guitars.filter((guitar) => guitar.previewImg && true).map(async (guitar) => {
            try {
              const { data: reviews } = await api.get<Review[]>(
                `${APIRoute.Guitars}/${guitar.id}/comments`,
              );

              userReviews.forEach((userReview) => {
                if (userReview.guitarId === guitar.id) {
                  reviews.push(userReview);
                }
              });

              return reviews ? { ...guitar, reviews } : { ...guitar, reviews: [] };
            } catch (error) {
              return { ...guitar, reviews: [] };
            }
          }),
        );
        dispatch(loadGuitars(guitarsWithReviews));
        dispatch(loadGuitar(null));
      } else {
        dispatch(loadGuitars([]));
      }
    } catch (e) {
      dispatch(loadGuitars([]));
    }
  },
);

export const postNewReviewAction = createAsyncThunk<
  void,
  NewUserReview,
  {
    dispatch: Dispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postNewReview',
  async (newReview, { dispatch, getState, extra: api }) => {
    try {
      const { data: reviews } = await api.get<Review[]>(
        `${APIRoute.Guitars}/${newReview.guitarId}/comments`,
      );
      if (reviews) {
        const { data: newServerReview } = await api.post<Review>(APIRoute.Comments, {...newReview});
        reviews.push(newServerReview);
        dispatch(
          updateGuitarReviews(
            reviews.sort(
              (a, b) => Date.parse(b.createAt) - Date.parse(a.createAt),
            ),
          ),
        );

        // update Local Storage User Reviews
        const lsData = localStorage.getItem('userReviews');
        if (lsData) {
          const userReviews = JSON.parse(lsData);
          userReviews.push(newServerReview);
          localStorage.setItem('userReviews', JSON.stringify(userReviews));
        }
      }
    } catch (e) {
      throw new Error('No Reviews loaded from server!');
    }
  },
);
