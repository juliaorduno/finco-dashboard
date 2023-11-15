import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { palencaApi } from "./services/palenca-api";
import transactionsSlice from "./features/transactions/transactions-slice";

export const store = configureStore({
  reducer: {
    [palencaApi.reducerPath]: palencaApi.reducer,
    transactions: transactionsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(palencaApi.middleware),
});

setupListeners(store.dispatch);
