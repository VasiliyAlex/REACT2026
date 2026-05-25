import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { type PokemonDetails } from '../types/pokemon';

const mockPokemon: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  sprites: { front_default: 'https://img.pikachu.png' },
};

describe('fetchPokemonDetails', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch and return Pokémon details', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemon),
      })
    ) as jest.Mock;

    const result = await fetchPokemonDetails('pikachu');
    expect(result).toEqual(mockPokemon);
    expect(fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu'
    );
  });

  it('should throw error if response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false })) as jest.Mock;

    await expect(fetchPokemonDetails('pikachu')).rejects.toThrow(
      'Error loading details for pikachu'
    );
  });

  it('should throw error on network failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;

    await expect(fetchPokemonDetails('pikachu')).rejects.toThrow(
      'Error loading details for pikachu'
    );
  });
});
