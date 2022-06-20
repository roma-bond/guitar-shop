import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../types/store';
import { GuitarWithReviews, Review } from '../types/guitars';

export const guitarReducerInitialState: State = {
  guitars: [],
  guitar: null,
};

export const guitarSlice = createSlice({
  name: 'data',
  initialState: guitarReducerInitialState,
  reducers: {
    loadGuitars: (state, action: PayloadAction<GuitarWithReviews[]>) => {
      state.guitars = action.payload;
    },
    loadGuitar: (state: State, action: PayloadAction<GuitarWithReviews | null>) => {
      state.guitar = action.payload;
    },
    updateGuitarReviews: (state: State, action: PayloadAction<Review[]>) => {
      (state.guitar as GuitarWithReviews).reviews = action.payload;
    },
  },
});

export const { loadGuitars, loadGuitar, updateGuitarReviews } = guitarSlice.actions;

export default guitarSlice.reducer;
