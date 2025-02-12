import { configureStore } from '@reduxjs/toolkit';

import { rickandmortyApi } from './services/rickandmortyApi';
import uiStateReducer from './features/uiStateSlice';

export const store = configureStore({
  reducer: {
    [rickandmortyApi.reducerPath]: rickandmortyApi.reducer,
    uiState: uiStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rickandmortyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
