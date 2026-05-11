import { fetchPokemonSpecies } from '../api/fetchPokemonSpecies';

describe('fetchPokemonSpecies', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns species data on successful fetch', async () => {
    const mockData = {
      name: 'pikachu',
      flavor_text_entries: [],
    };

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

    const result = await fetchPokemonSpecies('pikachu');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon-species/pikachu'
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockData);
  });

  it('throws error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(
      fetchPokemonSpecies('pikachu')
    ).rejects.toThrow('Failed to fetch species');
  });

  it('throws error when fetch rejects', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new Error('Network error')
    );

    await expect(
      fetchPokemonSpecies('pikachu')
    ).rejects.toThrow('Failed to fetch species');
  });
});