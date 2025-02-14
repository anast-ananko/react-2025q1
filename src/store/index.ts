import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { rickandmortyApi } from './services/rickandmortyApi';
import uiStateSlice from './features/uiStateSlice';
import selectedItemsReducer from './features/selectedItemsSlice';

const uiStatePersistConfig = {
  key: 'uiState',
  storage: storage,
};

export const persistedReducer = persistReducer(
  uiStatePersistConfig,
  uiStateSlice
);

export const store = configureStore({
  reducer: {
    [rickandmortyApi.reducerPath]: rickandmortyApi.reducer,
    uiState: persistedReducer,
    selectedItems: selectedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(rickandmortyApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
