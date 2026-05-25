import { type PokemonDetails } from '../types/pokemon';

export async function fetchPokemonDetails(
  name: string
): Promise<PokemonDetails> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }

    const data: PokemonDetails = await res.json();
    return data;
  } catch {
    throw new Error(`Error loading details for ${name}`);
  }
}
