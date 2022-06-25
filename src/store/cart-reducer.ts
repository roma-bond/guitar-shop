import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuitarWithCount } from '../types/guitars';

export interface CartState {
  cartGuitars: GuitarWithCount[],
  cartGuitarBeforeRemove: GuitarWithCount | null,
  discount: number,
}

export const cartReducerInitialState: CartState = {
  cartGuitars: [],
  cartGuitarBeforeRemove: null,
  discount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartReducerInitialState,
  reducers: {
    addGuitarToCart: (state, action: PayloadAction<GuitarWithCount>) => {
      const guitar = state.cartGuitars.find((cartGuitar) => cartGuitar.id === action.payload.id);
      guitar
        ? guitar.guitarCount++
        : state.cartGuitars.push(action.payload);
    },
    removeGuitarFromCart: (state, action: PayloadAction<number>) => {
      if (state.cartGuitarBeforeRemove) {
        const deleteIndex = state.cartGuitars.findIndex((cartGuitar) => cartGuitar.id === action.payload);
        if (deleteIndex >= 0) {
          state.cartGuitars.splice(deleteIndex, 1);
          state.cartGuitarBeforeRemove = null;
        }
      } else {
        const guitar = state.cartGuitars.find((cartGuitar) => cartGuitar.id === action.payload);
        if (guitar) {
          state.cartGuitarBeforeRemove = {...guitar};
        }
      }
    },
    cancelGuitarRemoveFromCart: (state) => {
      state.cartGuitarBeforeRemove = null;
    },
    decreaseCartGuitarCount: (state, action: PayloadAction<number>) => {
      const guitar = state.cartGuitars.find((cartGuitar) => cartGuitar.id === action.payload);
      if (guitar) {
        if (guitar.guitarCount > 1) {
          guitar.guitarCount--;
        } else {
          state.cartGuitarBeforeRemove = {...guitar};
        }
      }
    },
    increaseCartGuitarCount: (state, action: PayloadAction<number>) => {
      const guitar = state.cartGuitars.find((cartGuitar) => cartGuitar.id === action.payload);
      if (guitar) {
        guitar.guitarCount++;
      }
    },
    updateCartGuitarCount: (state, action: PayloadAction<{id: number, updateBy: number}>) => {
      const guitar = state.cartGuitars.find((cartGuitar) => cartGuitar.id === action.payload.id);
      if (guitar) {
        guitar.guitarCount = action.payload.updateBy;
      }
    },
    setCartDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const {
  addGuitarToCart,
  removeGuitarFromCart,
  cancelGuitarRemoveFromCart,
  decreaseCartGuitarCount,
  increaseCartGuitarCount,
  updateCartGuitarCount,
  setCartDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;
