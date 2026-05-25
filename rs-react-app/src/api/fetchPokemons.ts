import type { PokeApiListResponse } from '../types/pokemon';
import type { PokeResponse } from '../types/pokemon';

const PAGE_LIMIT = 12;

export async function fetchPokemons(
  query = '',
  page = 1
): Promise<PokeResponse> {
  const normalizedQuery = query.trim().toLowerCase();

  try {
    if (normalizedQuery) {
      const allRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=2000`
      );
      if (!allRes.ok) {
        const errText = await allRes.text();
        throw new Error(
          `Failed to fetch full list: ${allRes.status} ${errText}`
        );
      }

      const allData: PokeApiListResponse = await allRes.json();

      const filtered = allData.results.filter((pokemon) =>
        pokemon.name.includes(normalizedQuery)
      );

      const totalFiltered = filtered.length;
      const totalPages = Math.ceil(totalFiltered / PAGE_LIMIT);

      const start = (page - 1) * PAGE_LIMIT;
      const paginatedResults = filtered.slice(start, start + PAGE_LIMIT);

      return {
        results: paginatedResults,
        total_records: totalFiltered,
        total_pages: totalPages,
      };
    } else {
      const offset = (page - 1) * PAGE_LIMIT;
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`;

      const res = await fetch(url);
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(
          `Failed to fetch page: ${res.status} ${res.statusText} - ${errText}`
        );
      }

      const data: PokeApiListResponse = await res.json();

      return {
        results: data.results,
        total_records: data.count,
        total_pages: Math.ceil(data.count / PAGE_LIMIT),
      };
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error('Unknown fetch error');
  }
}
