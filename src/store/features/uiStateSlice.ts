import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  page: number;
  query: string;
}

const initialState: UiState = {
  page: 1,
  query: '',
};

const uiStateSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setQuery, setPage } = uiStateSlice.actions;

export default uiStateSlice.reducer;
