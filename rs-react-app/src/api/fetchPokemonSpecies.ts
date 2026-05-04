export async function fetchPokemonSpecies(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch species');
  }

  return res.json();
}