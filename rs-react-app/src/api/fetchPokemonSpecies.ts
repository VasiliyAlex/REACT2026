export async function fetchPokemonSpecies(name: string) {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${name}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch species');
    }

    return await res.json();
  } catch (e) {
    throw new Error('Failed to fetch species');
  }
}