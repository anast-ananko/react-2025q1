import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character } from '../../types/apiTypes';

interface SelectedCardsState {
  selectedCards: Character[];
}

const initialState: SelectedCardsState = {
  selectedCards: [],
};

const SelectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState: initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const exists = state.selectedCards.find(
        (item) => item.id === character.id
      );

      if (exists) {
        state.selectedCards = state.selectedCards.filter(
          (item) => item.id !== character.id
        );
      } else {
        state.selectedCards.push(character);
      }
    },
    resetSelected: (state) => {
      state.selectedCards = [];
    },
  },
});

export const { toggleSelected, resetSelected } = SelectedCardsSlice.actions;

export default SelectedCardsSlice.reducer;
