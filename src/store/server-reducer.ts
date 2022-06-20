import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServerState } from '../types/store';

export const serverReducerInitialState: ServerState = {
  status: null,
};

export const serverSlice = createSlice({
  name: 'server',
  initialState: serverReducerInitialState,
  reducers: {
    updateServerStatus: (state: ServerState, action: PayloadAction<number | null>) => {
      state.status = action.payload;
    },
  },
});

export const { updateServerStatus } = serverSlice.actions;

export default serverSlice.reducer;
