import { store, persistedReducer } from './index';
import { setQuery, setPage } from './features/uiStateSlice';
import { toggleSelected, resetSelected } from './features/selectedCardsSlice';
import { mockCharacter } from '../__mocks__/mockCharacter';

describe('Redux Store', () => {
  const initialState = {
    page: 1,
    query: '',
    _persist: { version: -1, rehydrated: false },
  };

  beforeEach(() => {
    store.dispatch(resetSelected());
    store.dispatch(setQuery(''));
    store.dispatch(setPage(1));
  });

  it('should have correct initial state', () => {
    const state = store.getState();

    expect(state.uiState.page).toBe(1);
    expect(state.uiState.query).toBe('');
    expect(state.selectedCards.selectedCards).toHaveLength(0);
  });

  it('should update uiState with setQuery and setPage', () => {
    store.dispatch(setQuery('Morty'));
    store.dispatch(setPage(2));

    const state = store.getState();
    expect(state.uiState.query).toBe('Morty');
    expect(state.uiState.page).toBe(2);
  });

  it('should toggle selected character', () => {
    store.dispatch(toggleSelected(mockCharacter));

    let state = store.getState();
    expect(state.selectedCards.selectedCards).toHaveLength(1);
    expect(state.selectedCards.selectedCards[0]).toEqual(mockCharacter);

    store.dispatch(toggleSelected(mockCharacter));
    state = store.getState();
    expect(state.selectedCards.selectedCards).toHaveLength(0);
  });

  it('should reset selected characters', () => {
    store.dispatch(toggleSelected(mockCharacter));
    let state = store.getState();
    expect(state.selectedCards.selectedCards).toHaveLength(1);

    store.dispatch(resetSelected());
    state = store.getState();
    expect(state.selectedCards.selectedCards).toHaveLength(0);
  });

  it('should persist uiState changes', () => {
    let state = persistedReducer(initialState, setQuery('Summer'));
    expect(state.query).toBe('Summer');

    state = persistedReducer(state, setPage(3));
    expect(state.page).toBe(3);
  });
});
