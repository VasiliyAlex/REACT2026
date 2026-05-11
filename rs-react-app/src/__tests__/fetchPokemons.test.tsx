import {
  fetchPokemons,
  clearPokemonCache,
} from '../api/fetchPokemons';

beforeEach(() => {
  clearPokemonCache();
  vi.restoreAllMocks();
});

describe('fetchPokemons', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns pokemon data on successful fetch', async () => {
    const mockData = {
      results: [
        { name: 'pikachu', url: 'pokemon-url' },
      ],
    };

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const result = await fetchPokemons();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(result).toEqual(mockData);
  });

  it('throws error when response is not ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
      text: async () => 'Internal server error',
    } as Response);

    await expect(fetchPokemons()).rejects.toThrow(
       'Server is temporarily unavailable. Please try again later.'
    );
  });

  it('throws unknown fetch error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue('some weird error');

    await expect(fetchPokemons()).rejects.toThrow(
      'Unknown fetch error'
    );
  });

  it('uses cache and does not fetch again', async () => {
    const mockData = {
      results: [
        { name: 'bulbasaur', url: 'pokemon-url' },
      ],
    };

    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const firstCall = await fetchPokemons();

    const secondCall = await fetchPokemons();

    expect(firstCall).toEqual(mockData);

    expect(secondCall).toEqual(mockData);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});