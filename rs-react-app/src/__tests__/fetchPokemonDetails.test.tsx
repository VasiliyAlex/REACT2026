import { fetchPokemonDetails } from '../api/fetchPokemonDetails';

describe('fetchPokemonDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns pokemon details on successful fetch', async () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      height: 4,
      weight: 60,
    };

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => mockPokemon,
      } as Response);

    const result = await fetchPokemonDetails('pikachu');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu',
      undefined
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockPokemon);
  });

  it('throws error when response is not ok', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(
      fetchPokemonDetails('pikachu')
    ).rejects.toThrow(
      'Error loading details for pikachu'
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('throws error when fetch rejects', async () => {
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('Network error')
    );

    await expect(
      fetchPokemonDetails('charizard')
    ).rejects.toThrow(
      'Error loading details for charizard'
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('calls fetch with correct pokemon name', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => ({
          id: 1,
          name: 'bulbasaur',
        }),
      } as Response);

    await fetchPokemonDetails('bulbasaur');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur',
      undefined
    );
  });
});