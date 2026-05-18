import { fetchPokemons } from '../api/fetchPokemons';
import type { PokeApiListResponse } from '../types/pokemon';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('fetchPokemons', () => {
  const mockData: PokeApiListResponse = {
    count: 2,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  };

  it('should fetch filtered pokemons by name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchPokemons('bulba');
    expect(data.results).toHaveLength(1);
    expect(data.results[0].name).toBe('bulbasaur');
  });

  it('should throw error when response not ok', async () => {
    fetchMock.mockResponseOnce('Internal Server Error', { status: 500 });

    await expect(fetchPokemons('', 1)).rejects.toThrow(
      'Failed to fetch page: 500 Internal Server Error'
    );
  });
});
