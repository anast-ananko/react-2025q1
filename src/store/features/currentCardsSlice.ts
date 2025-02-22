import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../../types/apiTypes';

interface currentCardsState {
  currentCards: Character[];
}

const initialState: currentCardsState = {
  currentCards: [],
};

const currentCardsSlice = createSlice({
  name: 'currentCards',
  initialState: initialState,
  reducers: {
    setCurrentCards(state, action: PayloadAction<Character[]>) {
      state.currentCards = action.payload;
    },
  },
});

export const { setCurrentCards } = currentCardsSlice.actions;

export default currentCardsSlice.reducer;
