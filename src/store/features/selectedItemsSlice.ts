import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedCharacterIds: number[];
}

const initialState: SelectedItemsState = {
  selectedCharacterIds: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.selectedCharacterIds.includes(id)) {
        state.selectedCharacterIds = state.selectedCharacterIds.filter(
          (itemId) => itemId !== id
        );
      } else {
        state.selectedCharacterIds.push(id);
      }
    },
    resetSelected: (state) => {
      state.selectedCharacterIds = [];
    },
  },
});

export const { toggleSelected, resetSelected } = selectedItemsSlice.actions;

export default selectedItemsSlice.reducer;
