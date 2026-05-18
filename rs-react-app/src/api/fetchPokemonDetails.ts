import { type PokemonDetails } from '../types/pokemon';

export async function fetchPokemonDetails(
  name: string,
  options?: RequestInit
): Promise<PokemonDetails> {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`,
      options
    );
    if (!res.ok) throw new Error('Failed to fetch Pokémon details');

    const data: PokemonDetails = await res.json();
    return data;
  } catch (e) {
    console.error('Details fetch failed:', e);
    throw new Error(`Error loading details for ${name}`);
  }
}
