import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type PokemonDetails } from '../types/pokemon';

interface SelectedState {
  selected: PokemonDetails[];
}

const initialState: SelectedState = {
  selected: [],
};

const selectedSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<PokemonDetails>) {
      const index = state.selected.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.selected.splice(index, 1);
      } else {
        state.selected.push(action.payload);
      }
    },
    clearSelected(state) {
      state.selected = [];
    },
  },
});

export const { toggleSelected, clearSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
