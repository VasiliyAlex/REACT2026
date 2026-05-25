import selectedReducer, {
  toggleSelected,
  clearSelected,
} from '../store/selectedSlice';
import { type PokemonDetails } from '../types/pokemon';

const mockPokemon: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: 'https://pokeapi.co/api/v2/type/12/',
      },
    },
  ],
  sprites: { front_default: 'url' },
};

describe('selectedSlice', () => {
  it('should return the initial state', () => {
    expect(selectedReducer(undefined, { type: 'unknown_action' })).toEqual({
      selected: [],
    });
  });

  it('should add a Pokémon if it is not already selected', () => {
    const state = selectedReducer(undefined, toggleSelected(mockPokemon));
    expect(state.selected).toHaveLength(1);
    expect(state.selected[0]).toEqual(mockPokemon);
  });

  it('should remove a Pokémon if it is already selected', () => {
    const initialState = { selected: [mockPokemon] };
    const state = selectedReducer(initialState, toggleSelected(mockPokemon));
    expect(state.selected).toHaveLength(0);
  });

  it('should clear the list of selected Pokémon', () => {
    const initialState = { selected: [mockPokemon] };
    const state = selectedReducer(initialState, clearSelected());
    expect(state.selected).toEqual([]);
  });
});
