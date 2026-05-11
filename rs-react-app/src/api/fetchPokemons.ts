import type { PokeApiListResponse, PokeResponse } from '../types/pokemon';

let cache: PokeResponse | null = null;

export function clearPokemonCache() {
  cache = null;
}

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
      if (res.status >= 500) {
        throw new Error(
          'Server is temporarily unavailable. Please try again later.'
        );
      }

      if (res.status >= 400) {
        throw new Error(
          'Failed to load Pokémon data. Please check your request.'
        );
      }

      throw new Error('Something went wrong.');
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
