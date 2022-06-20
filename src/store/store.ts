import { configureStore } from '@reduxjs/toolkit';
import guitarReducer from './guitar-reducer';
import serverReducer from './server-reducer';
import { createAPI } from '../services/api';
import { updateServerStatus } from './server-reducer';

export const api = createAPI((num: number) => store.dispatch(updateServerStatus(num)));

const store = configureStore({
  reducer: {
    data: guitarReducer,
    server: serverReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export type RootState = ReturnType<typeof store.getState>
export default store;
