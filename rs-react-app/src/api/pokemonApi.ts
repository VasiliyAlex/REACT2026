import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokeResponse, PokemonDetails, Pokemon } from '../types/pokemon';

const PAGE_LIMIT = 12;
const CACHE_TTL = 300;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['PokemonList', 'PokemonDetails'],
  endpoints: (builder) => ({
    getPokemons: builder.query<PokeResponse, { query: string; page: number }>({
      queryFn: async ({ query, page }) => {
        try {
          const normalizedQuery = query.trim().toLowerCase();

          if (normalizedQuery) {
            const allRes = await fetch(
              'https://pokeapi.co/api/v2/pokemon?limit=2000'
            );
            if (!allRes.ok) throw new Error('Failed to fetch full list');
            const allData = await allRes.json();
            const filtered = allData.results.filter((p: Pokemon) =>
              p.name.includes(normalizedQuery)
            );

            const total = filtered.length;
            const start = (page - 1) * PAGE_LIMIT;
            const paginated = filtered.slice(start, start + PAGE_LIMIT);

            return {
              data: {
                results: paginated,
                total_records: total,
                total_pages: Math.ceil(total / PAGE_LIMIT),
              },
            };
          } else {
            const offset = (page - 1) * PAGE_LIMIT;
            const res = await fetch(
              `https://pokeapi.co/api/v2/pokemon?limit=${PAGE_LIMIT}&offset=${offset}`
            );
            if (!res.ok) throw new Error('Failed to fetch page');
            const data = await res.json();
            return {
              data: {
                results: data.results,
                total_records: data.count,
                total_pages: Math.ceil(data.count / PAGE_LIMIT),
              },
            };
          }
        } catch (e) {
          return {
            error: {
              status: 500,
              data: e instanceof Error ? e.message : 'Unknown error',
            },
          };
        }
      },
      providesTags: () => [{ type: 'PokemonList', id: 'LIST' }],
    }),

    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      providesTags: (result, error, name) => [
        { type: 'PokemonDetails', id: name },
      ],
    }),
    refreshPokemons: builder.mutation({
      queryFn: () => ({ data: undefined }),
      invalidatesTags: [{ type: 'PokemonList', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
  useRefreshPokemonsMutation,
} = pokemonApi;
