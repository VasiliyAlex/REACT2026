import type { PokeApiListResponse, PokeResponse } from '../types/pokemon';

let cache: PokeResponse | null = null;

export async function fetchPokemons(
  options?: RequestInit
): Promise<PokeResponse> {
  try {
    if (cache) {
      return cache;
    }

    const url = `https://pokeapi.co/api/v2/pokemon?limit=2000`;

    const res = await fetch(url, options);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(
        `Failed to fetch: ${res.status} ${res.statusText} - ${errText}`
      );
    }

    const data: PokeApiListResponse = await res.json();

    const result: PokeResponse = {
      results: data.results,
    };

    cache = result;

    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('Unknown fetch error');
  }
}
