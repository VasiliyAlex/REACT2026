export interface PokemonSprites {
  front_default: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  results: Pokemon[];
}

export interface PokeResponse {
  results: Pokemon[];
  total_records: number;
  total_pages: number;
}
