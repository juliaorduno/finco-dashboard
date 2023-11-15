import { createSlice } from "@reduxjs/toolkit";

export interface TransactionsState {
  favorites: Record<string, boolean>;
}

const initialState: TransactionsState = { favorites: {} };

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const transactionId = action.payload;
      state.favorites[transactionId] = true;
    },
    removeFavorite(state, action) {
      const transactionId = action.payload;
      if (state.favorites[transactionId]) {
        state.favorites[transactionId] = false;
      }
    },
  },
});

export const { addFavorite, removeFavorite } = transactionsSlice.actions;
export default transactionsSlice.reducer;
